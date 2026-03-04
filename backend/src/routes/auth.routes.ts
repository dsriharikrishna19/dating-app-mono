import { Router } from 'express';
import { register, login, verifyOtp, logout } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.post('/logout', logout);

export default router;
