import { Router } from 'express';
import { getProfile, onboarding, updateProfile, uploadImages, deleteImage } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = Router();
// All user routes are protected
router.use(authMiddleware);
/**
 * @openapi
 * /api/user/profile:
 *   get:
 *     tags: [User]
 *     summary: Get user profile
 *     security:
 *       - bearerAuth: []
 *   put:
 *     tags: [User]
 *     summary: Update user profile
 *     security:
 *       - bearerAuth: []
 */
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
/**
 * @openapi
 * /api/user/onboarding:
 *   post:
 *     tags: [User]
 *     summary: Complete user onboarding
 *     security:
 *       - bearerAuth: []
 */
router.post('/onboarding', onboarding);
/**
 * @openapi
 * /api/user/images:
 *   post:
 *     tags: [User]
 *     summary: Upload profile images
 *     security:
 *       - bearerAuth: []
 */
router.post('/images', uploadImages);
/**
 * @openapi
 * /api/user/images/{id}:
 *   delete:
 *     tags: [User]
 *     summary: Delete profile image
 *     security:
 *       - bearerAuth: []
 */
router.delete('/images/:id', deleteImage);
export default router;
