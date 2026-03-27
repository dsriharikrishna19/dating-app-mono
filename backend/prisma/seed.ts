import { PrismaClient } from '@prisma/client';
import process from 'node:process';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Interests
  const interests = [
    'Cooking', 'Hiking', 'Gaming', 'Music', 'Photography', 
    'Travel', 'Art', 'Fitness', 'Reading', 'Movies'
  ];

  const createdInterests = await Promise.all(
    interests.map(name => 
      prisma.interest.upsert({
        where: { name },
        update: {},
        create: { name }
      })
    )
  );

  // 2. Create Sample Users & Profiles
  const sampleUsers = [
    {
      phoneNumber: '+1234567890',
      email: 'alex@example.com',
      isGold: true,
      profile: {
        name: 'Alex Johnson',
        bio: 'Adventure seeker and coffee lover. Let\'s explore the city!',
        birthDate: new Date('1995-06-15'),
        gender: 'MALE',
        lookingFor: 'FEMALE',
        location: { latitude: 40.7128, longitude: -74.0060, address: 'New York, NY' },
        isGold: true,
        interests: { connect: [{ id: createdInterests[0].id }, { id: createdInterests[1].id }] }
      }
    },
    {
      phoneNumber: '+1987654321',
      email: 'sarah@example.com',
      isGold: true,
      profile: {
        name: 'Sarah Miller',
        bio: 'Artist, traveler, and amateur chef. Always looking for new inspiration.',
        birthDate: new Date('1993-02-10'),
        gender: 'FEMALE',
        lookingFor: 'MALE',
        location: JSON.stringify({ latitude: 34.0522, longitude: -118.2437, address: 'Los Angeles, CA' }),
        isGold: false,
        interests: { connect: [{ id: createdInterests[6].id }, { id: createdInterests[5].id }] }
      }
    },
    {
        phoneNumber: '+1122334455',
        email: 'jordan@example.com',
        isGold: true,
        profile: {
          name: 'Jordan Lee',
          bio: 'Fitness enthusiast and tech nerd. I love heavy weights and heavy metal.',
          birthDate: new Date('1998-11-20'),
          gender: 'MALE',
          lookingFor: 'FEMALE',
          location: JSON.stringify({ latitude: 41.8781, longitude: -87.6298, address: 'Chicago, IL' }),
          isGold: true,
          interests: { connect: [{ id: createdInterests[7].id }, { id: createdInterests[3].id }] }
        }
      }
  ];

  for (const u of sampleUsers) {
    await prisma.user.upsert({
      where: { phoneNumber: u.phoneNumber },
      update: {
        isVerified: true,
        onboarded: true,
      },
      create: {
        phoneNumber: u.phoneNumber,
        email: u.email,
        onboarded: true,
        isVerified: true,
        profile: {
          create: {
            ...u.profile,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop', isPrimary: true }
              ]
            }
          }
        }
      }
    });
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
