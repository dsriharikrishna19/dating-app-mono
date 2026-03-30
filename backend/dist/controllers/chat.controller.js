import prisma from '../lib/prisma.js';
import { getIO } from '../lib/socket.js';
import { z } from 'zod';
import { sendSuccess } from '../utils/response.js';
import { ForbiddenError } from '../utils/errors.js';
import { NotificationType } from '@prisma/client';
const SendMessageSchema = z.object({
    content: z.string().min(1),
});
export const getConversations = async (req, res, next) => {
    try {
        const userId = req.userId;
        const memberOf = await prisma.conversationMember.findMany({
            where: { userId },
            include: {
                conversation: {
                    include: {
                        members: {
                            where: { userId: { not: userId } },
                            include: {
                                user: {
                                    include: {
                                        profile: {
                                            include: { images: { where: { isPrimary: true }, take: 1 } }
                                        }
                                    }
                                }
                            }
                        },
                        messages: {
                            orderBy: { createdAt: 'desc' },
                            take: 1
                        }
                    }
                }
            }
        });
        const conversations = memberOf.map(m => {
            const conv = m.conversation;
            const otherMember = conv.members[0];
            return {
                id: conv.id,
                matchId: conv.matchId,
                otherUser: {
                    id: otherMember?.userId,
                    name: otherMember?.user.profile?.name || 'Unknown',
                    image: otherMember?.user.profile?.images[0]?.url || null,
                },
                lastMessage: conv.messages[0] || null,
                updatedAt: conv.updatedAt,
            };
        });
        sendSuccess(res, conversations, 'Conversations fetched successfully');
    }
    catch (error) {
        next(error);
    }
};
export const getMessages = async (req, res, next) => {
    try {
        const conversationId = req.params.conversationId;
        const userId = req.userId;
        const member = await prisma.conversationMember.findUnique({
            where: { conversationId_userId: { conversationId, userId } }
        });
        if (!member) {
            throw new ForbiddenError('You are not a member of this conversation');
        }
        const messages = await prisma.message.findMany({
            where: { conversationId },
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
        const { conversationId } = req.params;
        const userId = req.userId;
        const { content } = SendMessageSchema.parse(req.body);
        const member = await prisma.conversationMember.findUnique({
            where: { conversationId_userId: { conversationId, userId } }
        });
        if (!member) {
            throw new ForbiddenError('You are not authorized to send messages here');
        }
        const message = await prisma.message.create({
            data: { conversationId, senderId: userId, content },
        });
        // Update conversation timestamp
        await prisma.conversation.update({
            where: { id: conversationId },
            data: { updatedAt: new Date() }
        });
        // Notify other members
        const otherMembers = await prisma.conversationMember.findMany({
            where: { conversationId, userId: { not: userId } }
        });
        const io = getIO();
        otherMembers.forEach(m => {
            io.to(m.userId).emit('new_message', { conversationId, message });
            // Create notification
            prisma.notification.create({
                data: {
                    userId: m.userId,
                    type: NotificationType.NEW_MESSAGE,
                    referenceId: conversationId
                }
            }).catch(console.error); // Silent fail for notification in this block
        });
        sendSuccess(res, message, 'Message sent successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
export const markAsRead = async (req, res, next) => {
    try {
        const conversationId = req.params.conversationId;
        const userId = req.userId;
        await prisma.message.updateMany({
            where: {
                conversationId,
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
export const deleteConversation = async (req, res, next) => {
    try {
        const conversationId = req.params.conversationId;
        const userId = req.userId;
        const member = await prisma.conversationMember.findUnique({
            where: { conversationId_userId: { conversationId, userId } }
        });
        if (!member) {
            throw new ForbiddenError('You are not authorized to perform this action');
        }
        await prisma.conversation.delete({ where: { id: conversationId } });
        sendSuccess(res, null, 'Conversation deleted successfully');
    }
    catch (error) {
        next(error);
    }
};
