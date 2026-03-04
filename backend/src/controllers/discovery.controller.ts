import { type Request, type Response } from 'express';
import prisma from '../lib/prisma.js';
import { z } from 'zod';

interface AuthRequest extends Request {
    userId?: string;
}

const SwipeSchema = z.object({
    targetUserId: z.string(),
    action: z.enum(['LIKE', 'NOPE']),
});

const FiltersSchema = z.object({
    ageRange: z.array(z.number()).length(2),
    distance: z.number(),
    gender: z.string().optional(),
});

export const getFeed = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId!;

        // Basic logic: Find all users who are onboarded, not the current user,
        // and haven't been swiped on yet.

        // Get list of users already swiped on (either as user1 or user2)
        const swipedMatches = await prisma.match.findMany({
            where: {
                OR: [
                    { user1Id: userId },
                    { user2Id: userId },
                ],
            },
            select: {
                user1Id: true,
                user2Id: true,
            },
        });

        const swipedUserIds = swipedMatches.map(m => m.user1Id === userId ? m.user2Id : m.user1Id);
        swipedUserIds.push(userId); // Exclude self

        const profiles = await prisma.profile.findMany({
            where: {
                userId: {
                    notIn: swipedUserIds,
                },
                user: {
                    onboarded: true,
                },
            },
            include: {
                images: true,
                interests: true,
            },
            take: 20,
        });

        res.status(200).json({
            feed: profiles.map(p => ({
                ...p,
                location: p.location ? JSON.parse(p.location) : null,
            })),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const swipe = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId!;
        const { targetUserId, action } = SwipeSchema.parse(req.body);

        if (action === 'NOPE') {
            // Record a 'nope' by creating a match with a special status or just entry
            await prisma.match.create({
                data: {
                    user1Id: userId < targetUserId ? userId : targetUserId,
                    user2Id: userId < targetUserId ? targetUserId : userId,
                    status: 'UNMATCHED', // Using UNMATCHED to mean "swiped but not a match"
                },
            });

            res.status(200).json({ match: false });
            return;
        }

        // Action is LIKE
        // Check if the other user has already liked us
        const existingInterest = await prisma.match.findFirst({
            where: {
                OR: [
                    { user1Id: targetUserId, user2Id: userId, status: 'PENDING' },
                    { user1Id: userId, user2Id: targetUserId, status: 'PENDING' },
                ],
            },
        });

        if (existingInterest) {
            // It's a match!
            const match = await prisma.match.update({
                where: { id: existingInterest.id },
                data: { status: 'MATCHED' },
            });

            res.status(200).json({ match: true, matchId: match.id });
            return;
        }

        // No existing interest, create a pending match
        await prisma.match.create({
            data: {
                user1Id: userId < targetUserId ? userId : targetUserId,
                user2Id: userId < targetUserId ? targetUserId : userId,
                status: 'PENDING',
            },
        });

        res.status(200).json({ match: false });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.flatten() });
            return;
        }
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getFilters = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId!;
        const profile = await prisma.profile.findUnique({
            where: { userId },
            select: { filters: true },
        });

        res.status(200).json({
            filters: profile?.filters ? JSON.parse(profile.filters) : {
                ageRange: [18, 50],
                distance: 50,
                gender: 'ANY',
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateFilters = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId!;
        const filters = FiltersSchema.parse(req.body);

        await prisma.profile.update({
            where: { userId },
            data: {
                filters: JSON.stringify(filters),
            },
        });

        res.status(200).json({ message: 'Filters updated successfully' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.flatten() });
            return;
        }
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
