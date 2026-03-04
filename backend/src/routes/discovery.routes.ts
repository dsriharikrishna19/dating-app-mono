import { Router } from 'express';
import { getFeed, swipe, getFilters, updateFilters } from '../controllers/discovery.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/feed', getFeed);
router.post('/swipe', swipe);
router.get('/filters', getFilters);
router.put('/filters', updateFilters);

export default router;
