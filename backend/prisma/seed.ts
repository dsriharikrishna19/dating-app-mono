import { PrismaClient, SwipeType, NotificationType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Clear existing data (optional but recommended during refactor)
  await prisma.$transaction([
    prisma.notification.deleteMany(),
    prisma.message.deleteMany(),
    prisma.conversationMember.deleteMany(),
    prisma.conversation.deleteMany(),
    prisma.match.deleteMany(),
    prisma.swipe.deleteMany(),
    prisma.image.deleteMany(),
    prisma.userPreference.deleteMany(),
    prisma.interest.deleteMany(),
    prisma.profile.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // 2. Seed Interests
  const interests = await Promise.all([
    prisma.interest.create({ data: { name: 'Travel' } }),
    prisma.interest.create({ data: { name: 'Music' } }),
    prisma.interest.create({ data: { name: 'Photography' } }),
    prisma.interest.create({ data: { name: 'Fitness' } }),
    prisma.interest.create({ data: { name: 'Gaming' } }),
    prisma.interest.create({ data: { name: 'Cooking' } }),
    prisma.interest.create({ data: { name: 'Art' } }),
    prisma.interest.create({ data: { name: 'Reading' } }),
    prisma.interest.create({ data: { name: 'Movies' } }),
    prisma.interest.create({ data: { name: 'Tech' } }),
  ]);

  // 3. Seed Users
  const alice = await prisma.user.create({
    data: {
      phoneNumber: '+1111111111',
      email: 'alice@example.com',
      isVerified: true,
      onboarded: true,
      profile: {
        create: {
          name: 'Alice Johnson',
          bio: 'Traveling the world and loving life!',
          gender: 'FEMALE',
          birthDate: new Date('1998-05-15'),
          latitude: 40.7128,
          longitude: -74.006,
          interests: { connect: [{ name: 'Travel' }, { name: 'Photography' }, { name: 'Music' }] },
          images: {
            create: [
              { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', isPrimary: true },
            ]
          }
        }
      },
      preferences: {
        create: {
          minAge: 20,
          maxAge: 35,
          maxDistance: 50,
          genderPreference: 'MALE'
        }
      }
    }
  });

  const bob = await prisma.user.create({
    data: {
      phoneNumber: '+2222222222',
      email: 'bob@example.com',
      isVerified: true,
      onboarded: true,
      profile: {
        create: {
          name: 'Bob Miller',
          bio: 'Coffee lover and tech enthusiast.',
          gender: 'MALE',
          birthDate: new Date('1995-10-20'),
          latitude: 40.7306,
          longitude: -73.9352,
          interests: { connect: [{ name: 'Tech' }, { name: 'Music' }, { name: 'Gaming' }] },
          images: {
            create: [
              { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e', isPrimary: true },
            ]
          }
        }
      },
      preferences: {
        create: {
          minAge: 18,
          maxAge: 30,
          maxDistance: 50,
          genderPreference: 'FEMALE'
        }
      }
    }
  });

  const charlie = await prisma.user.create({
    data: {
      phoneNumber: '+3333333333',
      email: 'charlie@example.com',
      isVerified: true,
      onboarded: true,
      profile: {
        create: {
          name: 'Charlie Smith',
          bio: 'Outdoor guy who loves reading.',
          gender: 'MALE',
          birthDate: new Date('1992-02-10'),
          latitude: 40.7589,
          longitude: -73.9851,
          interests: { connect: [{ name: 'Reading' }, { name: 'Travel' }] },
          images: {
            create: [
              { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', isPrimary: true },
            ]
          }
        }
      }
    }
  });

  // 4. Seed Swipes
  // Alice likes Bob
  await prisma.swipe.create({
    data: {
      swiperId: alice.id,
      targetId: bob.id,
      type: SwipeType.LIKE,
    }
  });

  // Bob likes Alice (Mutual!)
  await prisma.swipe.create({
    data: {
      swiperId: bob.id,
      targetId: alice.id,
      type: SwipeType.LIKE,
    }
  });

  // Alice passes Charlie
  await prisma.swipe.create({
    data: {
      swiperId: alice.id,
      targetId: charlie.id,
      type: SwipeType.PASS,
    }
  });

  // 5. Establish Match & Conversation for Alice & Bob
  const match = await prisma.match.create({
    data: {
      userAId: alice.id,
      userBId: bob.id,
    }
  });

  const conversation = await prisma.conversation.create({
    data: {
      matchId: match.id,
      members: {
        create: [
          { userId: alice.id },
          { userId: bob.id },
        ]
      }
    }
  });

  // 6. Seed Messages
  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      senderId: alice.id,
      content: 'Hey Bob! Loved your tech bio.',
    }
  });

  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      senderId: bob.id,
      content: 'Hi Alice! Thanks. Where was your primary photo taken?',
    }
  });

  // 7. Seed Notifications
  await prisma.notification.create({
    data: {
      userId: alice.id,
      type: NotificationType.NEW_MATCH,
      referenceId: match.id,
    }
  });

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
