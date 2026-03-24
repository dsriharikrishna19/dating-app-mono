import { Router } from 'express';
import { register, login, verifyOtp, logout, resendOtp } from '../controllers/auth.controller.js';
const router = Router();
/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [phoneNumber]
 *             properties:
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', register);
/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [phoneNumber]
 *             properties:
 *               phoneNumber:
 *                 type: string
 */
router.post('/login', login);
/**
 * @openapi
 * /api/auth/verify-otp:
 *   post:
 *     tags: [Auth]
 *     summary: Verify OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [phoneNumber, otp]
 *             properties:
 *               phoneNumber:
 *                 type: string
 *               otp:
 *                 type: string
 */
router.post('/verify-otp', verifyOtp);
/**
 * @openapi
 * /api/auth/resend-otp:
 *   post:
 *     tags: [Auth]
 *     summary: Resend OTP
 */
router.post('/resend-otp', resendOtp);
/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout user
 */
router.post('/logout', logout);
export default router;
