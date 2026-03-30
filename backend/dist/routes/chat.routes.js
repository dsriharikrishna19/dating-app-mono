import { Router } from 'express';
import { getConversations, getMessages, sendMessage, markAsRead, deleteConversation } from '../controllers/chat.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = Router();
router.use(authMiddleware);
/**
 * @openapi
 * /api/chat/conversations:
 *   get:
 *     tags: [Chat]
 *     summary: Get all conversations for current user
 *     security:
 *       - bearerAuth: []
 */
router.get('/conversations', getConversations);
/**
 * @openapi
 * /api/chat/{conversationId}/messages:
 *   get:
 *     tags: [Chat]
 *     summary: Get messages for a conversation
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
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
 *         name: conversationId
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
router.get('/:conversationId/messages', getMessages);
router.post('/:conversationId/messages', sendMessage);
/**
 * @openapi
 * /api/chat/{conversationId}/read:
 *   put:
 *     tags: [Chat]
 *     summary: Mark messages as read
 *     security:
 *       - bearerAuth: []
 */
router.put('/:conversationId/read', markAsRead);
/**
 * @openapi
 * /api/chat/conversations/{conversationId}:
 *   delete:
 *     tags: [Chat]
 *     summary: Delete a conversation
 *     security:
 *       - bearerAuth: []
 */
router.delete('/conversations/:conversationId', deleteConversation);
export default router;
