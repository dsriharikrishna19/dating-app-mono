import prisma from '../lib/prisma.js';
import { z } from 'zod';
import { sendSuccess } from '../utils/response.js';
import { NotFoundError } from '../utils/errors.js';
const OnboardingSchema = z.object({
    name: z.string().min(2),
    bio: z.string().optional(),
    birthDate: z.string().transform((str) => new Date(str)),
    gender: z.string(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    interests: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    preferences: z.object({
        minAge: z.number().default(18),
        maxAge: z.number().default(50),
        maxDistance: z.number().default(50),
        genderPreference: z.enum(['MALE', 'FEMALE', 'OTHER', 'ANY']).default('ANY'),
    }).optional(),
});
const UpdateProfileSchema = OnboardingSchema.partial();
export const getProfile = async (req, res, next) => {
    try {
        const userId = req.userId;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                profile: {
                    include: { images: true, interests: true },
                },
                preferences: true,
            },
        });
        if (!user) {
            throw new NotFoundError('User not found');
        }
        sendSuccess(res, {
            user: {
                id: user.id,
                phoneNumber: user.phoneNumber,
                onboarded: user.onboarded,
                isVerified: user.isVerified,
            },
            profile: user.profile,
            preferences: user.preferences,
        }, 'Profile fetched successfully');
    }
    catch (error) {
        next(error);
    }
};
export const onboarding = async (req, res, next) => {
    try {
        const userId = req.userId;
        const data = OnboardingSchema.parse(req.body);
        const { interests, images, preferences, ...profileData } = data;
        // Create or update profile
        const profile = await prisma.profile.upsert({
            where: { userId },
            update: {
                ...profileData,
                interests: interests ? {
                    set: [],
                    connectOrCreate: interests.map((name) => ({
                        where: { name },
                        create: { name },
                    })),
                } : undefined,
                images: images ? {
                    create: images.map((url, idx) => ({ url, isPrimary: idx === 0 })),
                } : undefined,
            },
            create: {
                userId,
                ...profileData,
                interests: interests ? {
                    connectOrCreate: interests.map((name) => ({
                        where: { name },
                        create: { name },
                    })),
                } : undefined,
                images: images ? {
                    create: images.map((url, idx) => ({ url, isPrimary: idx === 0 })),
                } : undefined,
            },
        });
        // Create or update preferences
        if (preferences) {
            await prisma.userPreference.upsert({
                where: { userId },
                update: preferences,
                create: { ...preferences, userId },
            });
        }
        // Mark user as onboarded
        await prisma.user.update({
            where: { id: userId },
            data: { onboarded: true },
        });
        sendSuccess(res, profile, 'Onboarding completed successfully');
    }
    catch (error) {
        next(error);
    }
};
export const updateProfile = async (req, res, next) => {
    try {
        const userId = req.userId;
        const data = UpdateProfileSchema.parse(req.body);
        const { interests, images, preferences, ...profileData } = data;
        const profile = await prisma.profile.update({
            where: { userId },
            data: {
                ...profileData,
                interests: interests ? {
                    set: [],
                    connectOrCreate: interests.map((name) => ({
                        where: { name },
                        create: { name },
                    })),
                } : undefined,
                images: images ? {
                    create: images.map((url, idx) => ({ url, isPrimary: idx === 0 })),
                } : undefined,
            },
        });
        if (preferences) {
            await prisma.userPreference.upsert({
                where: { userId },
                update: preferences,
                create: { ...preferences, userId },
            });
        }
        sendSuccess(res, profile, 'Profile updated successfully');
    }
    catch (error) {
        next(error);
    }
};
export const uploadImages = async (req, res, next) => {
    try {
        const { urls } = req.body;
        const userId = req.userId;
        const profile = await prisma.profile.findUnique({ where: { userId } });
        if (!profile) {
            throw new NotFoundError('Profile not found');
        }
        const images = await Promise.all(urls.map((url) => prisma.image.create({
            data: { profileId: profile.id, url },
        })));
        sendSuccess(res, images, 'Images uploaded successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
export const deleteImage = async (req, res, next) => {
    try {
        const id = req.params.id;
        await prisma.image.delete({ where: { id } });
        sendSuccess(res, null, 'Image deleted successfully');
    }
    catch (error) {
        next(error);
    }
};
