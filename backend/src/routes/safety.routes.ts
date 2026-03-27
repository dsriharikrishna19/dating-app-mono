import { Router } from 'express';
import { blockUser, reportUser, getBlockedUsers, unblockUser } from '../controllers/safety.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { safetyActionLimiter } from '../middlewares/rateLimit.middleware.js';

const router = Router();

router.use(authMiddleware);

/**
 * @openapi
 * /api/safety/block:
 *   post:
 *     tags: [Safety]
 *     summary: Block a user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [blockedId]
 *             properties:
 *               blockedId: { type: string }
 */
router.post('/block', safetyActionLimiter, blockUser);

/**
 * @openapi
 * /api/safety/report:
 *   post:
 *     tags: [Safety]
 *     summary: Report a user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [reportedId, reason]
 *             properties:
 *               reportedId: { type: string }
 *               reason: { type: string }
 *               description: { type: string }
 */
router.post('/report', safetyActionLimiter, reportUser);

/**
 * @openapi
 * /api/safety/blocked:
 *   get:
 *     tags: [Safety]
 *     summary: Get list of blocked users
 *     security:
 *       - bearerAuth: []
 */
router.get('/blocked', getBlockedUsers);

/**
 * @openapi
 * /api/safety/unblock/{userId}:
 *   delete:
 *     tags: [Safety]
 *     summary: Unblock a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 */
router.delete('/unblock/:userId', safetyActionLimiter, unblockUser);

export default router;
