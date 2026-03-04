import { Router } from 'express';
import { getMatches, getMessages, sendMessage, markAsRead, unmatch } from '../controllers/chat.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/matches', getMatches);
router.get('/:matchId/messages', getMessages);
router.post('/:matchId/messages', sendMessage);
router.put('/:matchId/read', markAsRead);
router.delete('/matches/:matchId', unmatch);

export default router;
