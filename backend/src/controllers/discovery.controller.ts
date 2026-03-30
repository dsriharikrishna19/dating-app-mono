import { type Request, type Response, type NextFunction } from 'express';
import { sendSuccess } from '../utils/response.js';
import { DiscoveryService } from '../services/discovery.service.js';
import { SwipeService } from '../services/swipe.service.js';
import { z } from 'zod';
import prisma from '../lib/prisma.js';

interface AuthRequest extends Request {
    userId?: string;
}

const SwipeSchema = z.object({
    profileId: z.string(),
    type: z.enum(['LIKE', 'PASS', 'SUPERLIKE']),
});

const PreferenceSchema = z.object({
    minAge: z.number().min(18).max(100),
    maxAge: z.number().min(18).max(100),
    maxDistance: z.number().min(1).max(500),
    genderPreference: z.enum(['MALE', 'FEMALE', 'OTHER', 'ANY']),
});

export const getFeed = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.userId!;
        const feed = await DiscoveryService.getFeed(userId);
        sendSuccess(res, feed, 'Discovery feed fetched successfully');
    } catch (error) {
        next(error);
    }
};

export const swipe = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.userId!;
        const { profileId, type } = SwipeSchema.parse(req.body);
        const result = await SwipeService.handleSwipe(userId, profileId, type);
        
        sendSuccess(res, result, type === 'PASS' ? 'User passed' : 'User liked');
    } catch (error) {
        next(error);
    }
};

export const getFilters = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.userId!;
        const preferences = await DiscoveryService.getPreferences(userId);
        sendSuccess(res, preferences, 'Discovery preferences fetched successfully');
    } catch (error) {
        next(error);
    }
};

export const updateFilters = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.userId!;
        const preferences = PreferenceSchema.parse(req.body);
        const updated = await DiscoveryService.updatePreferences(userId, preferences);
        sendSuccess(res, updated, 'Discovery preferences updated successfully');
    } catch (error) {
        next(error);
    }
};

export const getWhoLikesMe = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.userId!;
        
        // Fetch users who have liked the current user but not been matched yet
        const incomingLikes = await prisma.swipe.findMany({
            where: { 
                targetId: userId, 
                type: { in: ['LIKE', 'SUPERLIKE'] } 
            },
            include: {
                swiper: {
                    include: {
                        profile: {
                            include: { images: { where: { isPrimary: true }, take: 1 } }
                        }
                    }
                }
            },
            take: 20
        });

        const likers = incomingLikes.map(s => ({
            id: s.swiperId,
            name: s.swiper.profile?.name || 'Unknown',
            imageUrl: s.swiper.profile?.images[0]?.url || null,
            type: s.type,
            createdAt: s.createdAt
        }));

        sendSuccess(res, likers, 'Incoming likes fetched successfully');
    } catch (error) {
        next(error);
    }
};
