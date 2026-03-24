import prisma from '../lib/prisma.js';
import { z } from 'zod';
import { sendSuccess } from '../utils/response.js';
import { BadRequestError } from '../utils/errors.js';
const BlockSchema = z.object({
    blockedId: z.string(),
});
const ReportSchema = z.object({
    reportedId: z.string(),
    reason: z.string(),
    description: z.string().optional(),
});
export const blockUser = async (req, res, next) => {
    try {
        const blockerId = req.userId;
        const { blockedId } = BlockSchema.parse(req.body);
        if (blockerId === blockedId) {
            throw new BadRequestError('You cannot block yourself');
        }
        await prisma.block.upsert({
            where: { blockerId_blockedId: { blockerId, blockedId } },
            update: {},
            create: { blockerId, blockedId },
        });
        // Automatically unmatch if they were matched
        await prisma.match.deleteMany({
            where: {
                OR: [
                    { user1Id: blockerId, user2Id: blockedId },
                    { user1Id: blockedId, user2Id: blockerId },
                ],
            },
        });
        sendSuccess(res, null, 'User blocked successfully');
    }
    catch (error) {
        next(error);
    }
};
export const reportUser = async (req, res, next) => {
    try {
        const reporterId = req.userId;
        const { reportedId, reason, description } = ReportSchema.parse(req.body);
        await prisma.report.create({
            data: { reporterId, reportedId, reason, description },
        });
        sendSuccess(res, null, 'Report submitted successfully');
    }
    catch (error) {
        next(error);
    }
};
export const getBlockedUsers = async (req, res, next) => {
    try {
        const userId = req.userId;
        const blocks = await prisma.block.findMany({
            where: { blockerId: userId },
        });
        const blockedUserIds = blocks.map((b) => b.blockedId);
        const profiles = await prisma.profile.findMany({
            where: { userId: { in: blockedUserIds } },
            include: { images: { take: 1 } },
        });
        sendSuccess(res, {
            blockedUsers: profiles.map(p => ({
                id: p.userId,
                name: p.name,
                image: p.images[0]?.url || null,
            })),
        }, 'Blocked users fetched successfully');
    }
    catch (error) {
        next(error);
    }
};
export const unblockUser = async (req, res, next) => {
    try {
        const blockerId = req.userId;
        const blockedId = req.params.userId;
        await prisma.block.delete({
            where: { blockerId_blockedId: { blockerId, blockedId } },
        });
        sendSuccess(res, null, 'User unblocked successfully');
    }
    catch (error) {
        next(error);
    }
};
