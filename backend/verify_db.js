const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const lastUser = await prisma.user.findFirst({
    orderBy: { createdAt: 'desc' },
  });
  console.log('Last User in DB:', JSON.stringify(lastUser, null, 2));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
