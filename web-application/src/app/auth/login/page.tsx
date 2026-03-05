'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { loginSchema, type LoginInput } from '@/schemas/authSchema';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAppDispatch } from '@/store/hooks';
import { loginUser, clearError } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginInput) => {
        dispatch(clearError());
        const resultAction = await dispatch(loginUser(data.phoneNumber));

        if (loginUser.fulfilled.match(resultAction)) {
            // Store phone number for OTP verification (could use local state or redux)
            localStorage.setItem('temp_phone', data.phoneNumber);
            router.push('/auth/verify-otp');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card w-full max-w-md p-8"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-slate-400">Sign in to continue your journey</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Input
                        label="Phone Number"
                        placeholder="+1 234 567 8900"
                        error={errors.phoneNumber?.message}
                        {...register('phoneNumber')}
                    />

                    <Button type="submit" className="w-full" size="lg">
                        Send OTP
                    </Button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-400">
                    Don't have an account?{' '}
                    <Link href="/auth/register" className="text-primary font-bold hover:underline">
                        Register Now
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
