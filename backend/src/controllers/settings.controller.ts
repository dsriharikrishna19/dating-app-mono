import { type Request, type Response, type NextFunction } from 'express';
import prisma from '../lib/prisma.js';
import { z } from 'zod';
import { sendSuccess } from '../utils/response.js';

interface AuthRequest extends Request {
    userId?: string;
}

const NotificationSchema = z.object({
    newMatches: z.boolean(),
    messages: z.boolean(),
    promotions: z.boolean(),
});

const PrivacySchema = z.object({
    profileVisible: z.boolean(),
    ghostMode: z.boolean(),
});

export const getNotifications = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.userId!;
        const profile = await prisma.profile.findUnique({
            where: { userId },
            select: {
                notificationMatches: true,
                notificationMessages: true,
                notificationPromos: true,
            },
        });

        sendSuccess(res, {
            notifications: {
                newMatches: profile?.notificationMatches ?? true,
                messages: profile?.notificationMessages ?? true,
                promotions: profile?.notificationPromos ?? false,
            },
        }, 'Notifications fetched successfully');
    } catch (error) {
        next(error);
    }
};

export const updateNotifications = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.userId!;
        const { newMatches, messages, promotions } = NotificationSchema.parse(req.body);

        await prisma.profile.update({
            where: { userId },
            data: {
                notificationMatches: newMatches,
                notificationMessages: messages,
                notificationPromos: promotions,
            },
        });

        sendSuccess(res, null, 'Notification preferences updated');
    } catch (error) {
        next(error);
    }
};

export const updatePrivacy = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.userId!;
        const { profileVisible, ghostMode } = PrivacySchema.parse(req.body);

        await prisma.profile.update({
            where: { userId },
            data: { profileVisible, ghostMode },
        });

        sendSuccess(res, null, 'Privacy settings updated');
    } catch (error) {
        next(error);
    }
};

export const deleteAccount = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.userId!;
        await prisma.user.delete({ where: { id: userId } });
        sendSuccess(res, null, 'Account and all data deleted permanently');
    } catch (error) {
        next(error);
    }
};

export const getConfig = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const interests = await prisma.interest.findMany();
        sendSuccess(res, {
            interests: interests.map((i) => i.name),
            genderOptions: ['MALE', 'FEMALE', 'NON_BINARY', 'OTHER'],
            lookingForOptions: ['MEN', 'WOMEN', 'EVERYONE'],
        }, 'Config fetched successfully');
    } catch (error) {
        next(error);
    }
};

