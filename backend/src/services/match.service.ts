import prisma from '../lib/prisma.js';
import { BadRequestError } from '../utils/errors.js';
import { NotificationType } from '@prisma/client';

export class MatchService {
    static async createMatch(userId1: string, userId2: string) {
        // Deterministic order for userA and userB to simplify queries and uniq constraints
        const [a, b] = [userId1, userId2].sort();

        // 1. Create Match
        const match = await prisma.match.upsert({
            where: { userAId_userBId: { userAId: a, userBId: b } },
            update: { status: 'MATCHED' },
            create: { userAId: a, userBId: b, status: 'MATCHED' },
        });

        // 2. Create Conversation (if not exists)
        let conversation = await prisma.conversation.findUnique({
            where: { matchId: match.id },
            include: { members: true }
        });

        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    matchId: match.id,
                    members: {
                        create: [
                            { userId: a },
                            { userId: b },
                        ]
                    }
                },
                include: { members: true }
            });
        }

        // 3. Create Notifications
        await prisma.notification.createMany({
            data: [
                { userId: a, type: NotificationType.NEW_MATCH, referenceId: match.id },
                { userId: b, type: NotificationType.NEW_MATCH, referenceId: match.id },
            ]
        });

        return { matched: true, match, conversation };
    }

    static async getMatches(userId: string) {
        const matches = await prisma.match.findMany({
            where: {
                OR: [
                    { userAId: userId, status: 'MATCHED' },
                    { userBId: userId, status: 'MATCHED' },
                ],
            },
            orderBy: { createdAt: 'desc' },
        });

        // Map to include the target profile for each match
        const enhancedMatches = await Promise.all(matches.map(async (m) => {
            const targetId = m.userAId === userId ? m.userBId : m.userAId;
            const targetProfile = await prisma.profile.findUnique({
                where: { userId: targetId },
                include: { images: { where: { isPrimary: true }, take: 1 } }
            });

            const conversation = await prisma.conversation.findUnique({
                where: { matchId: m.id },
                include: { 
                    messages: { 
                        orderBy: { createdAt: 'desc' }, 
                        take: 1 
                    } 
                }
            });

            return {
                ...m,
                targetProfile,
                lastMessage: conversation?.messages[0] || null,
                conversationId: conversation?.id
            };
        }));

        return enhancedMatches;
    }
}
