import prisma from '../lib/prisma.js';
import { z } from 'zod';
const BlockSchema = z.object({
    blockedId: z.string(),
});
const ReportSchema = z.object({
    reportedId: z.string(),
    reason: z.string(),
    description: z.string().optional(),
});
export const blockUser = async (req, res) => {
    try {
        const blockerId = req.userId;
        const { blockedId } = BlockSchema.parse(req.body);
        if (blockerId === blockedId) {
            res.status(400).json({ error: 'You cannot block yourself' });
            return;
        }
        await prisma.block.upsert({
            where: {
                blockerId_blockedId: { blockerId, blockedId },
            },
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
        res.status(200).json({ message: 'User blocked successfully' });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.flatten() });
            return;
        }
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const reportUser = async (req, res) => {
    try {
        const reporterId = req.userId;
        const { reportedId, reason, description } = ReportSchema.parse(req.body);
        await prisma.report.create({
            data: {
                reporterId,
                reportedId,
                reason,
                description,
            },
        });
        res.status(200).json({ message: 'Report submitted successfully' });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.flatten() });
            return;
        }
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getBlockedUsers = async (req, res) => {
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
        res.status(200).json({
            blockedUsers: profiles.map(p => ({
                id: p.userId,
                name: p.name,
                image: p.images[0]?.url || null,
            })),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const unblockUser = async (req, res) => {
    try {
        const blockerId = req.userId;
        const blockedId = req.params.userId;
        await prisma.block.delete({
            where: {
                blockerId_blockedId: { blockerId, blockedId },
            },
        });
        res.status(200).json({ message: 'User unblocked successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
