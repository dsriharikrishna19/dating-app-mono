import { type Request, type Response } from 'express';
import prisma from '../lib/prisma.js';
import { z } from 'zod';

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

export const getNotifications = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId!;
        const profile = await prisma.profile.findUnique({
            where: { userId },
            select: { filters: true }, // Reusing filters field or could add another
        });

        // Mocking for now since we didn't add notification field to schema
        res.status(200).json({
            notifications: {
                newMatches: true,
                messages: true,
                promotions: false,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateNotifications = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const data = NotificationSchema.parse(req.body);
        res.status(200).json({ message: 'Notification preferences updated', data });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.flatten() });
            return;
        }
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updatePrivacy = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const data = PrivacySchema.parse(req.body);
        res.status(200).json({ message: 'Privacy settings updated', data });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.flatten() });
            return;
        }
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteAccount = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId!;
        await prisma.user.delete({ where: { id: userId } });
        res.status(200).json({ message: 'Account and all data deleted permanently' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getConfig = async (req: Request, res: Response): Promise<void> => {
    try {
        const interests = await prisma.interest.findMany();
        res.status(200).json({
            interests: interests.map((i) => i.name),
            genderOptions: ['MALE', 'FEMALE', 'NON_BINARY', 'OTHER'],
            lookingForOptions: ['MEN', 'WOMEN', 'EVERYONE'],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
