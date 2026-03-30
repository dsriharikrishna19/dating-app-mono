import { Router } from 'express';
import { AgoraController } from '../controllers/agora.controller.js';
const router = Router();
/**
 * @swagger
 * /api/agora/token:
 *   get:
 *     summary: Generate an Agora RTC token
 *     tags: [Agora]
 *     parameters:
 *       - in: query
 *         name: channelName
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: uid
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Token generated successfully
 */
router.get('/token', AgoraController.getToken);
export default router;
