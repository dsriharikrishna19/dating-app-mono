import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { ENV_CONFIG } from '../config/env.config.js';
import { sendSuccess } from '../utils/response.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';
const { JWT_SECRET, OTP_MOCK } = ENV_CONFIG;
const RegisterSchema = z.object({
    phoneNumber: z.string().min(10).max(15),
});
const LoginSchema = z.object({
    phoneNumber: z.string().min(10).max(15),
});
const VerifyOtpSchema = z.object({
    phoneNumber: z.string().min(10).max(15),
    otp: z.string().length(6),
});
export const register = async (req, res, next) => {
    try {
        const { phoneNumber } = RegisterSchema.parse(req.body);
        const existingUser = await prisma.user.findUnique({
            where: { phoneNumber },
        });
        if (existingUser) {
            throw new BadRequestError('User already exists');
        }
        const newUser = await prisma.user.create({
            data: { phoneNumber },
        });
        // Mock OTP sending for first-time verification during registration.
        console.log(`OTP for ${phoneNumber}: ${OTP_MOCK}`);
        sendSuccess(res, {
            phoneNumber: newUser.phoneNumber,
            requiresVerification: true,
        }, 'User registered successfully. Please verify OTP.', 201);
    }
    catch (error) {
        next(error);
    }
};
export const login = async (req, res, next) => {
    try {
        const { phoneNumber } = LoginSchema.parse(req.body);
        const user = await prisma.user.findUnique({
            where: { phoneNumber },
        });
        if (!user) {
            throw new NotFoundError('User not found');
        }
        // Only unverified users should go through OTP verification flow.
        if (!user.isVerified) {
            console.log(`OTP for ${phoneNumber}: ${OTP_MOCK}`);
            sendSuccess(res, {
                phoneNumber,
                requiresVerification: true,
            }, 'Please verify OTP to continue');
            return;
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
        sendSuccess(res, {
            token,
            user: {
                id: user.id,
                phoneNumber: user.phoneNumber,
                onboarded: user.onboarded,
            },
            requiresVerification: false,
        }, 'Login successful');
    }
    catch (error) {
        next(error);
    }
};
export const verifyOtp = async (req, res, next) => {
    try {
        const { phoneNumber, otp } = VerifyOtpSchema.parse(req.body);
        if (otp !== OTP_MOCK) {
            throw new BadRequestError('Invalid OTP');
        }
        const user = await prisma.user.findUnique({
            where: { phoneNumber },
        });
        if (!user) {
            throw new NotFoundError('User not found');
        }
        // Mark as verified if not already
        if (!user.isVerified) {
            await prisma.user.update({
                where: { id: user.id },
                data: { isVerified: true },
            });
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
        sendSuccess(res, {
            token,
            user: {
                id: user.id,
                phoneNumber: user.phoneNumber,
                onboarded: user.onboarded,
            },
        }, 'Login successful');
    }
    catch (error) {
        next(error);
    }
};
export const logout = async (req, res) => {
    sendSuccess(res, null, 'Logged out successfully');
};
export const resendOtp = async (req, res, next) => {
    try {
        const { phoneNumber } = LoginSchema.parse(req.body);
        const user = await prisma.user.findUnique({
            where: { phoneNumber },
        });
        if (!user) {
            throw new NotFoundError('User not found');
        }
        // Mock OTP sending
        console.log(`Resending OTP for ${phoneNumber}: ${OTP_MOCK}`);
        sendSuccess(res, { phoneNumber }, 'OTP resent successfully');
    }
    catch (error) {
        next(error);
    }
};
