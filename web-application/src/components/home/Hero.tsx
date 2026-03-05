'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { forwardRef, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = forwardRef<HTMLDivElement>((props, ref) => {
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (titleRef.current) {
            const words = titleRef.current.innerText.split(' ');
            titleRef.current.innerHTML = words
                .map(word => `<span class="inline-block overflow-hidden"><span class="word inline-block">${word}</span></span>`)
                .join(' ');

            gsap.from('.word', {
                y: 100,
                rotate: 10,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'expo.out',
                delay: 0.2
            });
        }
    }, []);

    return (
        <section ref={ref} className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden px-4 pt-6">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-secondary/20 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse animation-delay-2000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
            </div>

            <div className="flex flex-col items-center gap-6 text-center z-10 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] uppercase tracking-[0.2em] font-black backdrop-blur-md shadow-[0_0_20px_rgba(255,68,88,0.1)]"
                >
                    <Star size={12} fill="currentColor" className="animate-spin-slow" />
                    <span>The Gold Standard of Dating</span>
                </motion.div>

                <h1 ref={titleRef} className="text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.85] text-white">
                    Spark Connections.
                </h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="text-base md:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed font-medium"
                >
                    Elevate your experience with an intelligent matching ecosystem designed for quality, depth, and genuine human chemistry.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link href="/auth/register">
                        <button className="group relative px-10 py-5 bg-primary rounded-full font-black text-white text-base overflow-hidden hover:scale-105 transition-all shadow-[0_10px_40px_rgba(255,68,88,0.3)] flex items-center gap-3">
                            <span className="relative z-10">Get Started</span>
                            <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </button>
                    </Link>
                    <button className="px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full font-black text-base hover:bg-white/10 transition-all text-white hover:border-white/20">
                        Explorer Platform
                    </button>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 flex flex-col items-center gap-3"
            >
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Scroll</span>
                <div className="w-5 h-9 border-2 border-slate-800 rounded-full flex justify-center p-1.5">
                    <motion.div
                        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-1 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(255,68,88,0.5)]"
                    />
                </div>
            </motion.div>
        </section>
    );
});

Hero.displayName = 'Hero';

export default Hero;
