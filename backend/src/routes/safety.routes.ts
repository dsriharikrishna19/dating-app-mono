import { Router } from 'express';
import { blockUser, reportUser, getBlockedUsers, unblockUser } from '../controllers/safety.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/block', blockUser);
router.post('/report', reportUser);
router.get('/blocked', getBlockedUsers);
router.delete('/unblock/:userId', unblockUser);

export default router;
