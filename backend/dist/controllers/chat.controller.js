import prisma from '../lib/prisma.js';
import { getIO } from '../lib/socket.js';
import { z } from 'zod';
import { MatchService } from '../services/match.service.js';
import { sendSuccess } from '../utils/response.js';
import { ForbiddenError } from '../utils/errors.js';
const SendMessageSchema = z.object({
    content: z.string().min(1),
});
export const getMatches = async (req, res, next) => {
    try {
        const userId = req.userId;
        const matches = await MatchService.getMatches(userId);
        const enrichedMatches = await Promise.all(matches.map(async (match) => {
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
        }));
        sendSuccess(res, enrichedMatches, 'Matches fetched successfully');
    }
    catch (error) {
        next(error);
    }
};
export const getMessages = async (req, res, next) => {
    try {
        const matchId = req.params.matchId;
        const userId = req.userId;
        const match = await prisma.match.findUnique({ where: { id: matchId } });
        if (!match || (match.user1Id !== userId && match.user2Id !== userId)) {
            throw new ForbiddenError('You are not authorized to view these messages');
        }
        const messages = await prisma.message.findMany({
            where: { matchId: matchId },
            orderBy: { createdAt: 'asc' },
        });
        sendSuccess(res, messages, 'Messages fetched successfully');
    }
    catch (error) {
        next(error);
    }
};
export const sendMessage = async (req, res, next) => {
    try {
        const { matchId } = req.params;
        const userId = req.userId;
        const { content } = SendMessageSchema.parse(req.body);
        const match = await prisma.match.findUnique({ where: { id: matchId } });
        if (!match || (match.user1Id !== userId && match.user2Id !== userId)) {
            throw new ForbiddenError('You are not authorized to send messages here');
        }
        const message = await prisma.message.create({
            data: { matchId, senderId: userId, content },
        });
        // Notify the other user via Socket.io
        const otherUserId = match.user1Id === userId ? match.user2Id : match.user1Id;
        const io = getIO();
        io.to(otherUserId).emit('new_message', { matchId, message });
        sendSuccess(res, message, 'Message sent successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
export const markAsRead = async (req, res, next) => {
    try {
        const matchId = req.params.matchId;
        const userId = req.userId;
        await prisma.message.updateMany({
            where: {
                matchId: matchId,
                senderId: { not: userId },
                isRead: false,
            },
            data: { isRead: true },
        });
        sendSuccess(res, null, 'Messages marked as read');
    }
    catch (error) {
        next(error);
    }
};
export const unmatch = async (req, res, next) => {
    try {
        const matchId = req.params.matchId;
        const userId = req.userId;
        const match = await prisma.match.findUnique({ where: { id: matchId } });
        if (!match || (match.user1Id !== userId && match.user2Id !== userId)) {
            throw new ForbiddenError('You are not authorized to perform this action');
        }
        await prisma.match.delete({ where: { id: matchId } });
        sendSuccess(res, null, 'Unmatched successfully');
    }
    catch (error) {
        next(error);
    }
};
