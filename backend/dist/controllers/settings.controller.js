import prisma from '../lib/prisma.js';
import { z } from 'zod';
const NotificationSchema = z.object({
    newMatches: z.boolean(),
    messages: z.boolean(),
    promotions: z.boolean(),
});
const PrivacySchema = z.object({
    profileVisible: z.boolean(),
    ghostMode: z.boolean(),
});
export const getNotifications = async (req, res) => {
    try {
        const userId = req.userId;
        const profile = await prisma.profile.findUnique({
            where: { userId },
            select: {
                notificationMatches: true,
                notificationMessages: true,
                notificationPromos: true,
            },
        });
        res.status(200).json({
            notifications: {
                newMatches: profile?.notificationMatches ?? true,
                messages: profile?.notificationMessages ?? true,
                promotions: profile?.notificationPromos ?? false,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const updateNotifications = async (req, res) => {
    try {
        const userId = req.userId;
        const { newMatches, messages, promotions } = NotificationSchema.parse(req.body);
        await prisma.profile.update({
            where: { userId },
            data: {
                notificationMatches: newMatches,
                notificationMessages: messages,
                notificationPromos: promotions,
            },
        });
        res.status(200).json({ message: 'Notification preferences updated' });
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
export const updatePrivacy = async (req, res) => {
    try {
        const userId = req.userId;
        const { profileVisible, ghostMode } = PrivacySchema.parse(req.body);
        await prisma.profile.update({
            where: { userId },
            data: {
                profileVisible,
                ghostMode,
            },
        });
        res.status(200).json({ message: 'Privacy settings updated' });
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
export const deleteAccount = async (req, res) => {
    try {
        const userId = req.userId;
        await prisma.user.delete({ where: { id: userId } });
        res.status(200).json({ message: 'Account and all data deleted permanently' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getConfig = async (req, res) => {
    try {
        const interests = await prisma.interest.findMany();
        res.status(200).json({
            interests: interests.map((i) => i.name),
            genderOptions: ['MALE', 'FEMALE', 'NON_BINARY', 'OTHER'],
            lookingForOptions: ['MEN', 'WOMEN', 'EVERYONE'],
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
