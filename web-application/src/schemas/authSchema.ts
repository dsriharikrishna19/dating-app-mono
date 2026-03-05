import { z } from 'zod';

export const loginSchema = z.object({
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
});

export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
});

export const verifyOtpSchema = z.object({
    otp: z.string().length(4, 'OTP must be 4 digits'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
