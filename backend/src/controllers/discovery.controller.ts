import { type Request, type Response, type NextFunction } from 'express';
import prisma from '../lib/prisma.js';
import { z } from 'zod';
import { sendSuccess } from '../utils/response.js';
import { calculateDistance } from '../utils/geo.js';
import { MatchService } from '../services/match.service.js';
import { BadRequestError } from '../utils/errors.js';

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

export const getFeed = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.userId!;

        // Get user's own profile and filters
        const ownProfile = await prisma.profile.findUnique({
            where: { userId },
            select: { filters: true, location: true, gender: true },
        });

        if (!ownProfile) {
            throw new BadRequestError('User profile not found. Please complete onboarding.');
        }

        const filters = ownProfile.filters ? JSON.parse(ownProfile.filters) : {
            ageRange: [18, 50],
            distance: 50,
            gender: 'ANY',
        };

        const ownLocation = ownProfile.location ? JSON.parse(ownProfile.location) : null;

        // Get list of users already swiped on or blocked
        const swipedMatches = await prisma.match.findMany({
            where: { OR: [{ user1Id: userId }, { user2Id: userId }] },
            select: { user1Id: true, user2Id: true },
        });
        const swipedUserIds = swipedMatches.map(m => m.user1Id === userId ? m.user2Id : m.user1Id);

        // Get blocked users
        const blocks = await prisma.block.findMany({
            where: { OR: [{ blockerId: userId }, { blockedId: userId }] },
        }) as Array<{ blockerId: string, blockedId: string }>;
        const blockedUserIds = blocks.map((b) => b.blockerId === userId ? b.blockedId : b.blockerId);

        const excludeIds = [...new Set([...swipedUserIds, ...blockedUserIds, userId])];

        // Fetch potential profiles
        const query: any = {
            userId: { notIn: excludeIds },
            user: { onboarded: true },
        };

        // Add gender filter if not 'ANY'
        if (filters.gender && filters.gender !== 'ANY') {
            query.gender = filters.gender;
        }

        const profiles = await prisma.profile.findMany({
            where: query,
            include: { images: true, interests: true },
            take: 100, // Fetch more to filter by distance/age in memory if needed
        });

        // Current date for age calculation
        const now = new Date();

        // Advanced Filtering (Distance and Age)
        const enrichedFeed = profiles.filter(p => {
            // Age Filter
            if (p.birthDate) {
                const age = now.getFullYear() - p.birthDate.getFullYear();
                if (age < filters.ageRange[0] || age > filters.ageRange[1]) return false;
            }

            // Distance Filter
            if (ownLocation && p.location) {
                const targetLoc = JSON.parse(p.location);
                const distance = calculateDistance(ownLocation.lat, ownLocation.lng, targetLoc.lat, targetLoc.lng);
                if (distance > filters.distance) return false;
                (p as any).distance = Math.round(distance);
            }

            return true;
        })
            .slice(0, 20)
            .map(p => ({
                ...p,
                location: p.location ? JSON.parse(p.location) : null,
            }));

        sendSuccess(res, enrichedFeed, 'Discovery feed fetched successfully');
    } catch (error) {
        next(error);
    }
};

export const swipe = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.userId!;
        const { targetUserId, action } = SwipeSchema.parse(req.body);

        const result = await MatchService.handleSwipe(userId, targetUserId, action);

        sendSuccess(res, {
            match: result?.status === 'MATCHED',
            matchId: result?.status === 'MATCHED' ? result.id : null,
        }, action === 'LIKE' ? 'User liked' : 'User passed');
    } catch (error) {
        next(error);
    }
};

export const getFilters = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.userId!;
        const profile = await prisma.profile.findUnique({
            where: { userId },
            select: { filters: true },
        });

        const filters = profile?.filters ? JSON.parse(profile.filters) : {
            ageRange: [18, 50],
            distance: 50,
            gender: 'ANY',
        };

        sendSuccess(res, filters, 'Filters fetched successfully');
    } catch (error) {
        next(error);
    }
};

export const updateFilters = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.userId!;
        const filters = FiltersSchema.parse(req.body);

        await prisma.profile.update({
            where: { userId },
            data: { filters: JSON.stringify(filters) },
        });

        sendSuccess(res, null, 'Filters updated successfully');
    } catch (error) {
        next(error);
    }
};
