import { type Request, type Response } from 'express';
import prisma from '../lib/prisma.js';
import { getIO } from '../lib/socket.js';
import { z } from 'zod';

interface AuthRequest extends Request {
    userId?: string;
}

const SendMessageSchema = z.object({
    content: z.string().min(1),
});

export const getMatches = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId!;

        const matches = await prisma.match.findMany({
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

        const enrichedMatches = await Promise.all(
            matches.map(async (match) => {
                const otherUserId = match.user1Id === userId ? match.user2Id : match.user1Id;
                const otherProfile = await prisma.profile.findUnique({
                    where: { userId: otherUserId },
                    include: { images: { take: 1 } },
                });

                return {
                    id: match.id,
                    otherUser: {
                        id: otherUserId,
                        name: otherProfile?.name || 'Unknown',
                        image: otherProfile?.images[0]?.url || null,
                    },
                    lastMessage: match.messages[0] || null,
                    updatedAt: match.updatedAt,
                };
            })
        );

        res.status(200).json({ matches: enrichedMatches });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getMessages = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const matchId = req.params.matchId as string;
        const userId = req.userId!;

        // Verify user is part of the match
        const match = await prisma.match.findUnique({
            where: { id: matchId },
        });

        if (!match || (match.user1Id !== userId && match.user2Id !== userId)) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }

        const messages = await prisma.message.findMany({
            where: { matchId: matchId as string },
            orderBy: { createdAt: 'asc' },
        });

        res.status(200).json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const sendMessage = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { matchId } = req.params as { matchId: string };
        const userId = req.userId!;
        const { content } = SendMessageSchema.parse(req.body);

        const match = await prisma.match.findUnique({
            where: { id: matchId },
        });

        if (!match || (match.user1Id !== userId && match.user2Id !== userId)) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }

        const message = await prisma.message.create({
            data: {
                matchId,
                senderId: userId,
                content,
            },
        });

        // Notify the other user via Socket.io
        const otherUserId = match.user1Id === userId ? match.user2Id : match.user1Id;
        const io = getIO();
        io.to(otherUserId).emit('new_message', {
            matchId,
            message,
        });

        res.status(201).json({ message });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.flatten() });
            return;
        }
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const markAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const matchId = req.params.matchId as string;
        const userId = req.userId!;

        await prisma.message.updateMany({
            where: {
                matchId: matchId as string,
                senderId: { not: userId },
                isRead: false,
            },
            data: { isRead: true },
        });

        res.status(200).json({ message: 'Messages marked as read' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const unmatch = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const matchId = req.params.matchId as string;
        const userId = req.userId!;

        const match = await prisma.match.findUnique({ where: { id: matchId } });

        if (!match || (match.user1Id !== userId && match.user2Id !== userId)) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }

        await prisma.match.delete({ where: { id: matchId as string } });

        res.status(200).json({ message: 'Unmatched successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
