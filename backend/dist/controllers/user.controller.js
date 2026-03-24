import prisma from '../lib/prisma.js';
import { z } from 'zod';
import { sendSuccess } from '../utils/response.js';
import { NotFoundError } from '../utils/errors.js';
const OnboardingSchema = z.object({
    name: z.string().min(2),
    bio: z.string().optional(),
    birthDate: z.string().transform((str) => new Date(str)),
    gender: z.string(),
    lookingFor: z.string().optional(),
    location: z.object({
        lat: z.number(),
        lng: z.number(),
        city: z.string(),
    }).optional(),
    interests: z.array(z.string()).optional(),
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
            profile: user.profile ? {
                ...user.profile,
                location: user.profile.location ? JSON.parse(user.profile.location) : null,
                filters: user.profile.filters ? JSON.parse(user.profile.filters) : null,
            } : null,
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
        const { interests, location, ...profileData } = data;
        // Create or update profile
        const profile = await prisma.profile.upsert({
            where: { userId },
            update: {
                ...profileData,
                location: location ? JSON.stringify(location) : undefined,
                interests: interests ? {
                    connectOrCreate: interests.map((name) => ({
                        where: { name },
                        create: { name },
                    })),
                } : undefined,
            },
            create: {
                userId,
                ...profileData,
                location: location ? JSON.stringify(location) : undefined,
                interests: interests ? {
                    connectOrCreate: interests.map((name) => ({
                        where: { name },
                        create: { name },
                    })),
                } : undefined,
            },
        });
        // Mark user as onboarded
        await prisma.user.update({
            where: { id: userId },
            data: { onboarded: true },
        });
        sendSuccess(res, {
            ...profile,
            location: profile.location ? JSON.parse(profile.location) : null,
        }, 'Onboarding completed successfully');
    }
    catch (error) {
        next(error);
    }
};
export const updateProfile = async (req, res, next) => {
    try {
        const userId = req.userId;
        const data = UpdateProfileSchema.parse(req.body);
        const { interests, location, ...profileData } = data;
        const profile = await prisma.profile.update({
            where: { userId },
            data: {
                ...profileData,
                location: location ? JSON.stringify(location) : undefined,
                interests: interests ? {
                    set: [], // Clear existing
                    connectOrCreate: interests.map((name) => ({
                        where: { name },
                        create: { name },
                    })),
                } : undefined,
            },
        });
        sendSuccess(res, {
            ...profile,
            location: profile.location ? JSON.parse(profile.location) : null,
        }, 'Profile updated successfully');
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
