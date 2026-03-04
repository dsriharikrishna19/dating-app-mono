import { Router } from 'express';
import { getProfile, onboarding, updateProfile, uploadImages, deleteImage } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// All user routes are protected
router.use(authMiddleware);

router.get('/profile', getProfile);
router.post('/onboarding', onboarding);
router.put('/profile', updateProfile);
router.post('/images', uploadImages);
router.delete('/images/:id', deleteImage);

export default router;
