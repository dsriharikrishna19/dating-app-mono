import { Router } from 'express';
import { getNotifications, updateNotifications, updatePrivacy, deleteAccount, getConfig } from '../controllers/settings.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// /config is public, others are protected
router.get('/config', getConfig);

router.use(authMiddleware);

router.get('/notifications', getNotifications);
router.put('/notifications', updateNotifications);
router.put('/privacy', updatePrivacy);
router.delete('/account', deleteAccount);

export default router;
