import { PrismaClient, SwipeType } from '@prisma/client';
import prisma from '../lib/prisma.js';
import { BadRequestError } from '../utils/errors.js';
import { MatchService } from './match.service.js';

export class SwipeService {
    static async handleSwipe(userId: string, targetId: string, type: SwipeType) {
        if (userId === targetId) {
            throw new BadRequestError('You cannot swipe on yourself');
        }

        // 1. Record the swipe
        const swipe = await prisma.swipe.upsert({
            where: {
                swiperId_targetId: {
                    swiperId: userId,
                    targetId: targetId,
                }
            },
            update: { type },
            create: {
                swiperId: userId,
                targetId: targetId,
                type,
            }
        });

        // 2. If it's a LIKE or SUPERLIKE, check for mutual swipe
        if (type === SwipeType.LIKE || type === SwipeType.SUPERLIKE) {
            const reverseSwipe = await prisma.swipe.findUnique({
                where: {
                    swiperId_targetId: {
                        swiperId: targetId,
                        targetId: userId,
                    }
                }
            });

            if (reverseSwipe && (reverseSwipe.type === SwipeType.LIKE || reverseSwipe.type === SwipeType.SUPERLIKE)) {
                // IT'S A MATCH!
                return await MatchService.createMatch(userId, targetId);
            }
        }

        return { matched: false, swipe };
    }
}
