import { Router } from 'express';
import { getMatches, getMessages, sendMessage, markAsRead, unmatch } from '../controllers/chat.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

/**
 * @openapi
 * /api/chat/matches:
 *   get:
 *     tags: [Chat]
 *     summary: Get all matches for current user
 *     security:
 *       - bearerAuth: []
 */
router.get('/matches', getMatches);

/**
 * @openapi
 * /api/chat/{matchId}/messages:
 *   get:
 *     tags: [Chat]
 *     summary: Get messages for a match
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: string
 *   post:
 *     tags: [Chat]
 *     summary: Send a message
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content: { type: string }
 */
router.get('/:matchId/messages', getMessages);
router.post('/:matchId/messages', sendMessage);

/**
 * @openapi
 * /api/chat/{matchId}/read:
 *   put:
 *     tags: [Chat]
 *     summary: Mark messages as read
 *     security:
 *       - bearerAuth: []
 */
router.put('/:matchId/read', markAsRead);

/**
 * @openapi
 * /api/chat/matches/{matchId}:
 *   delete:
 *     tags: [Chat]
 *     summary: Unmatch a user
 *     security:
 *       - bearerAuth: []
 */
router.delete('/matches/:matchId', unmatch);

export default router;
