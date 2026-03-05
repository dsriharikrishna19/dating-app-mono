import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Verifying tables via Prisma...');
        // Try to query the User table (it should be empty but exist)
        const userCount = await prisma.user.count();
        console.log(`Successfully connected. User count: ${userCount}`);
        console.log('Tables are confirmed to exist in the database.');
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error verifying tables:', err.message);
        } else {
            console.error('Error verifying tables:', err);
        }
    } finally {
        await prisma.$disconnect();
    }
}

main();
