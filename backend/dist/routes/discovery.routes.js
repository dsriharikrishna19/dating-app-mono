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
 *             required: [profileId, type]
 *             properties:
 *               profileId: { type: string }
 *               type: { type: string, enum: [LIKE, PASS, SUPERLIKE] }
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
 *     summary: Get discovery preferences
 *     security:
 *       - bearerAuth: []
 *   put:
 *     tags: [Discovery]
 *     summary: Update discovery preferences
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               minAge: { type: number }
 *               maxAge: { type: number }
 *               maxDistance: { type: number }
 *               genderPreference: { type: string, enum: [MALE, FEMALE, ANY] }
 */
router.get('/filters', getFilters);
router.put('/filters', updateFilters);
export default router;
