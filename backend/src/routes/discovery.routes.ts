import { Router } from 'express';
import { getFeed, swipe, getFilters, updateFilters, getWhoLikesMe } from '../controllers/discovery.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

/**
 * @openapi
 * /api/discovery/feed:
 *   get:
 *     tags: [Discovery]
 *     summary: Get potential matches feed
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Discovery feed fetched successfully
 */
router.get('/feed', getFeed);

/**
 * @openapi
 * /api/discovery/swipe:
 *   post:
 *     tags: [Discovery]
 *     summary: Swipe on a profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [profileId, direction]
 *             properties:
 *               profileId:
 *                 type: string
 *               direction:
 *                 type: string
 *                 enum: [LEFT, RIGHT, SUPERLIKE]
 */
router.post('/swipe', swipe);

/**
 * @openapi
 * /api/discovery/likes:
 *   get:
 *     tags: [Discovery]
 *     summary: Get users who liked current user
 *     security:
 *       - bearerAuth: []
 */
router.get('/likes', getWhoLikesMe);

/**
 * @openapi
 * /api/discovery/filters:
 *   get:
 *     tags: [Discovery]
 *     summary: Get discovery filters
 *     security:
 *       - bearerAuth: []
 *   put:
 *     tags: [Discovery]
 *     summary: Update discovery filters
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ageRange:
 *                 type: array
 *                 items: { type: number }
 *               distance:
 *                 type: number
 *               gender:
 *                 type: string
 */
router.get('/filters', getFilters);
router.put('/filters', updateFilters);

export default router;
