import prisma from '../lib/prisma.js';
import { z } from 'zod';
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
export const getProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                profile: {
                    include: {
                        images: true,
                        interests: true,
                    },
                },
            },
        });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json({
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
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const onboarding = async (req, res) => {
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
        res.status(200).json({
            message: 'Onboarding completed successfully',
            profile: {
                ...profile,
                location: profile.location ? JSON.parse(profile.location) : null,
            },
        });
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
export const updateProfile = async (req, res) => {
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
        res.status(200).json({
            message: 'Profile updated successfully',
            profile: {
                ...profile,
                location: profile.location ? JSON.parse(profile.location) : null,
            },
        });
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
export const uploadImages = async (req, res) => {
    try {
        // In a real app, you'd use multer and upload to S3/Cloudinary
        // Mocking image upload
        const { urls } = req.body;
        const userId = req.userId;
        const profile = await prisma.profile.findUnique({ where: { userId } });
        if (!profile) {
            res.status(404).json({ error: 'Profile not found' });
            return;
        }
        const images = await Promise.all(urls.map((url) => prisma.image.create({
            data: {
                profileId: profile.id,
                url,
            },
        })));
        res.status(201).json({ message: 'Images uploaded successfully', images });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const deleteImage = async (req, res) => {
    try {
        const id = req.params.id;
        await prisma.image.delete({ where: { id } });
        res.status(200).json({ message: 'Image deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
