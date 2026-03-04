import { Router } from 'express';
import { register, login, verifyOtp, logout, resendOtp } from '../controllers/auth.controller.js';
const router = Router();
router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/logout', logout);
export default router;
