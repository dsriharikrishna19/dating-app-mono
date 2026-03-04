import { type Request, type Response } from 'express';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const OTP_MOCK = '123456'; // Default OTP for testing

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

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { phoneNumber } = RegisterSchema.parse(req.body);

        const existingUser = await prisma.user.findUnique({
            where: { phoneNumber },
        });

        if (existingUser) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }

        const newUser = await prisma.user.create({
            data: {
                phoneNumber,
            },
        });

        res.status(201).json({
            message: 'User registered successfully. Please verify OTP.',
            user: newUser,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.flatten() });
            return;
        }
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { phoneNumber } = LoginSchema.parse(req.body);

        const user = await prisma.user.findUnique({
            where: { phoneNumber },
        });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // Mock OTP sending
        console.log(`OTP for ${phoneNumber}: ${OTP_MOCK}`);

        res.status(200).json({
            message: 'OTP sent successfully',
            phoneNumber,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.flatten() });
            return;
        }
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { phoneNumber, otp } = VerifyOtpSchema.parse(req.body);

        if (otp !== OTP_MOCK) {
            res.status(400).json({ error: 'Invalid OTP' });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { phoneNumber },
        });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // Mark as verified if not already
        if (!user.isVerified) {
            await prisma.user.update({
                where: { id: user.id },
                data: { isVerified: true },
            });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                phoneNumber: user.phoneNumber,
                onboarded: user.onboarded,
            },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.flatten() });
            return;
        }
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    // In a real app, you might invalidate the token in a redis store or similar
    res.status(200).json({ message: 'Logged out successfully' });
};
