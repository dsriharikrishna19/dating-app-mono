'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { verifyOtpSchema, type VerifyOtpInput } from '@/schemas/authSchema';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { authService } from '@/services/authService';
import { useAppDispatch } from '@/store/hooks';
import { setToken, setLoading, setError } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function VerifyOtpPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

    useEffect(() => {
        const phone = localStorage.getItem('temp_phone');
        if (!phone) {
            router.push('/auth/login');
        } else {
            setPhoneNumber(phone);
        }
    }, [router]);

    const { register, handleSubmit, formState: { errors } } = useForm<VerifyOtpInput>({
        resolver: zodResolver(verifyOtpSchema),
    });

    const onSubmit = async (data: VerifyOtpInput) => {
        if (!phoneNumber) return;

        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const response = await authService.verifyOtp(phoneNumber, data.otp);

            if (response.token) {
                dispatch(setToken(response.token));
                localStorage.removeItem('temp_phone');

                // If user is not onboarded, go to onboarding, else to discover
                if (response.user?.onboarded) {
                    router.push('/discover');
                } else {
                    router.push('/auth/onboarding');
                }
            }
        } catch (err: any) {
            dispatch(setError(err.response?.data?.message || 'Verification failed'));
            console.error(err);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card w-full max-w-md p-8 md:p-10"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Verify OTP</h2>
                    <p className="text-slate-400">Enter the 4-digit code sent to {phoneNumber}</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Input
                        label="OTP Code"
                        placeholder="0000"
                        maxLength={4}
                        className="text-center text-3xl tracking-[1rem] font-black"
                        error={errors.otp?.message}
                        {...register('otp')}
                    />

                    <Button type="submit" className="w-full" size="lg">
                        Verify & Continue
                    </Button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => router.push('/auth/login')}
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                        Didn't receive code? Resend or Use another number
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
