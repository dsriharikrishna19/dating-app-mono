"use client";

import { useForm } from 'react-hook-form';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeWaitlistModal } from '@/store/slices/uiSlice';
import Button from '../ui/Button';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type WaitlistFormData = {
    name: string;
    email: string;
    intent: string;
};

export default function WaitlistModal() {
    const isOpen = useAppSelector((state) => state.ui.isWaitlistModalOpen);
    const dispatch = useAppDispatch();

    const [isMounted, setIsMounted] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const successRef = useRef<HTMLDivElement>(null);

    // Sync isMounted with isOpen but delay unmounting for animation
    useEffect(() => {
        if (isOpen) setIsMounted(true);
    }, [isOpen]);

    useGSAP(() => {
        if (isOpen && isMounted) {
            // Animate In
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
            gsap.fromTo(modalRef.current,
                { opacity: 0, scale: 0.95, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' }
            );
        } else if (!isOpen && isMounted) {
            // Animate Out
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' });
            gsap.to(modalRef.current, {
                opacity: 0,
                scale: 0.95,
                y: 20,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => setIsMounted(false)
            });
        }
    }, [isOpen, isMounted]);

    useGSAP(() => {
        if (isSubmitted && successRef.current) {
            gsap.fromTo(successRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }
            );
        }
    }, [isSubmitted]);

    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<WaitlistFormData>({
        mode: 'onChange'
    });

    const handleClose = () => {
        dispatch(closeWaitlistModal());
    };

    const onSubmit = (data: WaitlistFormData) => {
        console.log('Submitted to waitlist:', data);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
            setTimeout(() => {
                handleClose();
                setTimeout(() => {
                    reset();
                    setIsSubmitted(false);
                }, 400); // wait for modal to close before resetting
            }, 3000);
        }, 1000);
    };

    if (!isMounted) return null;

    return (
        <>
            <div
                ref={overlayRef}
                onClick={handleClose}
                className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm opacity-0"
            />

            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 py-8 pointer-events-none">
                <div
                    ref={modalRef}
                    className="w-full max-w-md bg-surface border border-border rounded-3xl p-8 shadow-2xl relative pointer-events-auto opacity-0"
                >
                    <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 text-text-muted hover:text-white transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {isSubmitted ? (
                        <div
                            ref={successRef}
                            className="flex flex-col items-center justify-center py-12 text-center opacity-0"
                        >
                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
                            <p className="text-text-muted">Keep an eye on your inbox. We'll let you know as soon as we launch.</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 border border-primary/20">
                                    <Sparkles className="w-6 h-6 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">Join the Waitlist</h2>
                                <p className="text-text-muted text-sm">Experience the premium era of dating early. Give us your details below.</p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-text-muted">Name</label>
                                    <input
                                        {...register('name', { required: 'Name is required' })}
                                        id="name"
                                        placeholder="What should we call you?"
                                        className="w-full transition-all duration-200"
                                        style={{ borderColor: errors.name ? '#f43f5e' : undefined }}
                                    />
                                    {errors.name && <p className="text-primary text-xs mt-1.5">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-text-muted">Email</label>
                                    <input
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        id="email"
                                        placeholder="you@example.com"
                                        className="w-full transition-all duration-200"
                                        style={{ borderColor: errors.email ? '#f43f5e' : undefined }}
                                    />
                                    {errors.email && <p className="text-primary text-xs mt-1.5">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="intent" className="block text-sm font-medium mb-1.5 text-text-muted">What are you looking for?</label>
                                    <select
                                        {...register('intent', { required: 'Please select an option' })}
                                        id="intent"
                                        className="w-full font-family-inherit bg-surface-light border border-border text-text p-3 rounded-lg outline-none focus:border-primary transition-colors appearance-none"
                                    >
                                        <option value="" disabled hidden>Select an option</option>
                                        <option value="serious">A Serious Relationship</option>
                                        <option value="casual">Casual Dating</option>
                                        <option value="friends">Meeting New Friends</option>
                                        <option value="not_sure">Not Sure Yet</option>
                                    </select>
                                    {errors.intent && <p className="text-primary text-xs mt-1.5">{errors.intent.message}</p>}
                                </div>

                                <Button
                                    type="submit"
                                    fullWidth
                                    className="mt-8"
                                    disabled={!isValid}
                                >
                                    Reserve My Spot
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
