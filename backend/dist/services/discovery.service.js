import prisma from '../lib/prisma.js';
import { calculateDistance } from '../utils/geo.js';
import { BadRequestError } from '../utils/errors.js';
export class DiscoveryService {
    static async getFeed(userId) {
        // 1. Get user's profile and preferences
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                profile: true,
                preferences: true
            }
        });
        if (!user || !user.profile) {
            throw new BadRequestError('User profile not found. Please complete onboarding.');
        }
        const { profile, preferences } = user;
        const userPrefs = preferences || {
            minAge: 18,
            maxAge: 50,
            maxDistance: 50,
            genderPreference: 'ANY'
        };
        // 2. Get excluded IDs (swipes, blocks, reported)
        const swipedIds = await prisma.swipe.findMany({
            where: { swiperId: userId },
            select: { targetId: true }
        }).then(swipes => swipes.map(s => s.targetId));
        const blockedIds = await prisma.block.findMany({
            where: { OR: [{ blockerId: userId }, { blockedId: userId }] },
            select: { blockerId: true, blockedId: true }
        }).then(blocks => blocks.map(b => b.blockerId === userId ? b.blockedId : b.blockerId));
        const excludeIds = [...new Set([...swipedIds, ...blockedIds, userId])];
        // 3. Build Query
        const where = {
            userId: { notIn: excludeIds },
            user: { onboarded: true },
        };
        if (userPrefs.genderPreference !== 'ANY') {
            where.gender = userPrefs.genderPreference;
        }
        if (profile.birthDate) {
            const minDate = new Date();
            minDate.setFullYear(minDate.getFullYear() - userPrefs.maxAge);
            const maxDate = new Date();
            maxDate.setFullYear(maxDate.getFullYear() - userPrefs.minAge);
            where.birthDate = {
                gte: minDate,
                lte: maxDate
            };
        }
        // 4. Fetch Potential Profiles
        const profiles = await prisma.profile.findMany({
            where,
            include: { images: true, interests: true },
            take: 100
        });
        // 5. Distance Filtering in Memory (More precise than bounding box for now)
        const feed = profiles.filter(p => {
            if (profile.latitude && profile.longitude && p.latitude && p.longitude) {
                const distance = calculateDistance(profile.latitude, profile.longitude, p.latitude, p.longitude);
                if (distance > userPrefs.maxDistance)
                    return false;
                p.distance = Math.round(distance);
            }
            return true;
        }).slice(0, 20);
        return feed;
    }
    static async getPreferences(userId) {
        return await prisma.userPreference.findUnique({
            where: { userId }
        });
    }
    static async updatePreferences(userId, data) {
        return await prisma.userPreference.upsert({
            where: { userId },
            update: data,
            create: { ...data, userId }
        });
    }
}
