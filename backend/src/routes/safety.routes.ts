import { Router } from 'express';
import { blockUser, reportUser, getBlockedUsers, unblockUser } from '../controllers/safety.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { safetyActionLimiter } from '../middlewares/rateLimit.middleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/block', safetyActionLimiter, blockUser);
router.post('/report', safetyActionLimiter, reportUser);
router.get('/blocked', getBlockedUsers);
router.delete('/unblock/:userId', safetyActionLimiter, unblockUser);

export default router;
