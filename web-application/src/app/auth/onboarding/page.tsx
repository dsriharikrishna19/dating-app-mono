'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { userService } from '@/services/userService';
import { useRouter } from 'next/navigation';

const onboardingSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    gender: z.string().min(1, 'Please select a gender'),
    bio: z.string().min(10, 'Bio should be at least 10 characters'),
    interests: z.string().min(1, 'Add at least one interest'),
});

type OnboardingData = z.infer<typeof onboardingSchema>;

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, trigger, watch } = useForm<OnboardingData>({
        resolver: zodResolver(onboardingSchema),
    });

    const nextStep = async () => {
        let fields: (keyof OnboardingData)[] = [];
        if (step === 1) fields = ['name', 'gender'];
        if (step === 2) fields = ['bio', 'interests'];

        const isValid = await trigger(fields);
        if (isValid) setStep(s => s + 1);
    };

    const onSubmit = async (data: OnboardingData) => {
        try {
            setLoading(true);
            await userService.onboard(data);
            router.push('/discover');
        } catch (err) {
            console.error('Onboarding failed', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
            <motion.div
                layout
                className="glass-card w-full max-w-lg p-8 md:p-10 relative overflow-hidden"
            >
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                    <motion.div
                        className="h-full bg-primary shadow-[0_0_10px_rgba(255,68,88,0.5)]"
                        initial={{ width: '33.33%' }}
                        animate={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>

                <div className="mb-10 mt-4">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        {step === 1 && "The Basics"}
                        {step === 2 && "About You"}
                        {step === 3 && "Final Touches"}
                    </h2>
                    <p className="text-slate-400">Step {step} of 3</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <Input
                                    label="What's your name?"
                                    placeholder="Enter your full name"
                                    error={errors.name?.message}
                                    {...register('name')}
                                />

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400 ml-1">Gender</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Male', 'Female', 'Other'].map((g) => (
                                            <button
                                                key={g}
                                                type="button"
                                                onClick={() => register('gender').onChange({ target: { value: g, name: 'gender' } })}
                                                className={`py-3 rounded-2xl border transition-all ${watch('gender') === g
                                                        ? 'bg-primary border-primary text-white'
                                                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                                                    }`}
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.gender && <p className="text-xs text-primary mt-1 italic">{errors.gender.message}</p>}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-400 ml-1">Bio</label>
                                    <textarea
                                        className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                                        placeholder="Tell us something interesting..."
                                        {...register('bio')}
                                    />
                                    {errors.bio && <p className="text-xs text-primary mt-1 italic">{errors.bio.message}</p>}
                                </div>

                                <Input
                                    label="Interests (comma separated)"
                                    placeholder="Travel, Music, Hiking..."
                                    error={errors.interests?.message}
                                    {...register('interests')}
                                />
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8 text-center py-4"
                            >
                                <div className="w-32 h-32 bg-white/5 border-2 border-dashed border-white/20 rounded-full mx-auto flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-all">
                                    <span className="text-4xl">📸</span>
                                    <span className="text-xs text-slate-500 mt-2">Add Photo</span>
                                </div>

                                <p className="text-sm text-slate-400 mt-4 leading-relaxed">
                                    By clicking complete, you agree to our community guidelines and terms of service. Let's make some connections!
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex gap-4 mt-12">
                        {step > 1 && (
                            <Button
                                type="button"
                                variant="ghost"
                                className="flex-1"
                                onClick={() => setStep(s => s - 1)}
                            >
                                Back
                            </Button>
                        )}

                        {step < 3 ? (
                            <Button type="button" className="flex-1" onClick={nextStep}>
                                Continue
                            </Button>
                        ) : (
                            <Button type="submit" className="flex-1" isLoading={loading}>
                                Complete
                            </Button>
                        )}
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
