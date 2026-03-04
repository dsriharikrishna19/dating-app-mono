"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Button from '../ui/Button';
import { useAppDispatch } from '@/store/hooks';
import { openWaitlistModal } from '@/store/slices/uiSlice';
import { Heart, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function HeroSection() {
    const containerRef = useRef<HTMLElement>(null);
    const dispatch = useAppDispatch();

    // Refs for GSAP animation targets
    const textGroupRef = useRef<HTMLDivElement>(null);
    const mainCardRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // 1. Text entrance stagger
        const textElements = textGroupRef.current?.children;
        if (textElements) {
            tl.from(textElements, {
                y: 30,
                opacity: 0,
                filter: 'blur(10px)',
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out'
            }, 0.2);
        }

        // 2. Main card entrance & continuous float
        tl.fromTo(mainCardRef.current,
            { opacity: 0, scale: 0.8, rotateY: -25, rotateX: 15 },
            {
                opacity: 1,
                scale: 1,
                rotateY: -15,
                rotateX: 10,
                duration: 1.5,
                ease: 'expo.out'
            },
            0.4
        );

        gsap.to(mainCardRef.current, {
            y: "-=20",
            rotateZ: 1,
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.9 // wait for entrance to finish
        });

        // 3. Notification entrance & continuous float
        tl.fromTo(notificationRef.current,
            { opacity: 0, x: 100, rotateZ: 10 },
            {
                opacity: 1,
                x: 0,
                rotateZ: 0,
                duration: 1.2,
                ease: 'extrapolate', // back.out(1.7) analogue
                easeConfig: gsap.parseEase("back.out(1.5)")
            },
            0.8
        );

        gsap.to(notificationRef.current, {
            y: "+=15",
            rotateZ: -1,
            duration: 5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 2.0
        });

        // 4. Parallax Scroll effect
        gsap.to(mainCardRef.current, {
            y: 200,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.to(notificationRef.current, {
            y: -100,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center justify-center">
            {/* Background Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">

                {/* Text Content */}
                <div ref={textGroupRef} className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium border-primary/30">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="gradient-text">The premium dating experience</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                        Find connections that truly <span className="gradient-text">resonate.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-text-muted max-w-xl leading-relaxed">
                        Stop endlessly swiping. Aura uses intelligent matching, stunning design, and verified profiles to bring you meaningful relationships.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                        <Button size="lg" onClick={() => dispatch(openWaitlistModal())} className="group flex items-center gap-2 relative overflow-hidden">
                            <span className="relative z-10">Join the Waitlist</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                        </Button>
                        <Button size="lg" variant="outline" className="hover:border-primary/50 transition-colors duration-300">
                            Learn How It Works
                        </Button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-text-muted mt-8">
                        <div className="flex -space-x-4 hover:space-x-1 transition-all duration-300 ease-out cursor-pointer">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="w-10 h-10 rounded-full border-2 border-background bg-surface-light flex items-center justify-center overflow-hidden shadow-lg hover:-translate-y-1 hover:scale-110 hover:z-10 transition-transform duration-300"
                                >
                                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i + 15}`} alt="User" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <p><strong>10k+</strong> people already on the waitlist</p>
                    </div>
                </div>

                {/* Visual Content */}
                <div className="relative h-[600px] hidden lg:block perspective-1000">
                    <div
                        ref={mainCardRef}
                        className="absolute right-10 top-10 w-[320px] h-[550px] glass rounded-3xl p-4 shadow-2xl overflow-hidden border-border z-20"
                    >
                        {/* Mock App Interface - Card */}
                        <div className="w-full h-full rounded-2xl bg-surface relative overflow-hidden flex items-end shadow-inner">
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-surface/40 to-transparent z-10" />
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Profile" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />

                            <div className="relative z-20 p-6 w-full">
                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold flex items-center gap-2 drop-shadow-md">Isabella, 24 <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" /></h3>
                                    <p className="text-text-muted drop-shadow-md">Designer &middot; New York</p>
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <button className="w-14 h-14 rounded-full bg-surface/50 backdrop-blur-md flex items-center justify-center text-text-muted hover:text-white hover:scale-110 active:scale-95 transition-all border border-border">
                                        <X className="w-6 h-6" />
                                    </button>
                                    <button className="flex-1 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-[0_0_30px_rgba(244,63,94,0.5)] border border-primary-hover hover:scale-105 active:scale-95 transition-all">
                                        <Heart className="w-6 h-6 fill-current" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        ref={notificationRef}
                        className="absolute -left-10 bottom-24 w-[280px] glass rounded-2xl p-4 z-30 flex items-center gap-4 border border-white/10 shadow-2xl backdrop-blur-xl"
                    >
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                            <MessageCircle className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-white drop-shadow-sm">New Match!</p>
                            <p className="text-xs text-text-muted">You and Alex liked each other.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Ensure X is available for mock app
const X = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
