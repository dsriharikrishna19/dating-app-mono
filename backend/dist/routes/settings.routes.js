import { Router } from 'express';
import { getNotifications, updateNotifications, updatePrivacy, deleteAccount, getConfig } from '../controllers/settings.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = Router();
// /config is public, others are protected
/**
 * @openapi
 * /api/settings/config:
 *   get:
 *     tags: [Settings]
 *     summary: Get public app configuration
 */
router.get('/config', getConfig);
router.use(authMiddleware);
/**
 * @openapi
 * /api/settings/notifications:
 *   get:
 *     tags: [Settings]
 *     summary: Get user notification settings
 *     security:
 *       - bearerAuth: []
 *   put:
 *     tags: [Settings]
 *     summary: Update user notification settings
 *     security:
 *       - bearerAuth: []
 */
router.get('/notifications', getNotifications);
router.put('/notifications', updateNotifications);
/**
 * @openapi
 * /api/settings/privacy:
 *   put:
 *     tags: [Settings]
 *     summary: Update privacy settings
 *     security:
 *       - bearerAuth: []
 */
router.put('/privacy', updatePrivacy);
/**
 * @openapi
 * /api/settings/account:
 *   delete:
 *     tags: [Settings]
 *     summary: Delete user account
 *     security:
 *       - bearerAuth: []
 */
router.delete('/account', deleteAccount);
export default router;
