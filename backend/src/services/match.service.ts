import prisma from '../lib/prisma.js';
import { BadRequestError } from '../utils/errors.js';

export class MatchService {
    static async handleSwipe(userId: string, targetUserId: string, action: 'LIKE' | 'NOPE') {
        if (userId === targetUserId) {
            throw new BadRequestError('You cannot swipe on yourself');
        }

        // Standardize IDs for unique constraint (user1Id < user2Id)
        const id1 = userId < targetUserId ? userId : targetUserId;
        const id2 = userId < targetUserId ? targetUserId : userId;

        if (action === 'NOPE') {
            return await prisma.match.upsert({
                where: { user1Id_user2Id: { user1Id: id1, user2Id: id2 } },
                update: { status: 'UNMATCHED' },
                create: { user1Id: id1, user2Id: id2, status: 'UNMATCHED' },
            });
        }

        // Action is LIKE
        // Check if other user already liked us
        const existingSwipe = await prisma.match.findUnique({
            where: { user1Id_user2Id: { user1Id: id1, user2Id: id2 } },
        });

        if (existingSwipe) {
            // Check if they liked us (if existingSwipe was created by them)
            const wasLikedByOther =
                (existingSwipe.user1Id === targetUserId && existingSwipe.status === 'PENDING') ||
                (existingSwipe.user2Id === targetUserId && existingSwipe.status === 'PENDING');

            // Note: This logic is slightly simplified for the MVP. 
            // In a full app, you'd track WHO liked WHO specifically (e.g. LikedBy array).
            // For now, if there's a PENDING match where the other user is involved, we consider it a match.

            if (existingSwipe.status === 'PENDING') {
                return await prisma.match.update({
                    where: { id: existingSwipe.id },
                    data: { status: 'MATCHED' },
                });
            }
        }

        // Create initial PENDING match
        return await prisma.match.create({
            data: {
                user1Id: id1,
                user2Id: id2,
                status: 'PENDING',
            },
        });
    }

    static async getMatches(userId: string) {
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
