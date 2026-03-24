import prisma from '../lib/prisma.js';
import { BadRequestError } from '../utils/errors.js';
export class MatchService {
    static async handleSwipe(userId, targetUserId, direction) {
        if (userId === targetUserId) {
            throw new BadRequestError('You cannot swipe on yourself');
        }
        const id1 = userId < targetUserId ? userId : targetUserId;
        const id2 = userId < targetUserId ? targetUserId : userId;
        if (direction === 'LEFT') {
            return await prisma.match.upsert({
                where: { user1Id_user2Id: { user1Id: id1, user2Id: id2 } },
                update: { status: 'UNMATCHED' },
                create: { user1Id: id1, user2Id: id2, status: 'UNMATCHED' },
            });
        }
        if (direction === 'SUPERLIKE') {
            return await prisma.match.upsert({
                where: { user1Id_user2Id: { user1Id: id1, user2Id: id2 } },
                update: { status: 'MATCHED' },
                create: { user1Id: id1, user2Id: id2, status: 'MATCHED' },
            });
        }
        // Action is RIGHT (LIKE)
        const existingSwipe = await prisma.match.findUnique({
            where: { user1Id_user2Id: { user1Id: id1, user2Id: id2 } },
        });
        if (existingSwipe) {
            if (existingSwipe.status === 'PENDING') {
                return await prisma.match.update({
                    where: { id: existingSwipe.id },
                    data: { status: 'MATCHED' },
                });
            }
        }
        return await prisma.match.create({
            data: {
                user1Id: id1,
                user2Id: id2,
                status: 'PENDING',
            },
        });
    }
    static async getMatches(userId) {
        return await prisma.match.findMany({
            where: {
                OR: [
                    { user1Id: userId, status: 'MATCHED' },
                    { user2Id: userId, status: 'MATCHED' },
                ],
            },
            include: {
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
            },
        });
    }
}
