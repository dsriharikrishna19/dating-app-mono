'use client';

import Link from 'next/link';
import { CheckCircle2, Zap } from 'lucide-react';
import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CTA_PERKS } from '@/constants/perks';

const CTA = memo(function CTA() {
    const perks = useMemo(() => CTA_PERKS, []);

    return (
        <section className="py-24 px-4 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none animate-pulse" />

            <div className="max-w-6xl mx-auto relative group">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-white/5 via-white/2 to-white/[0.01] border border-white/10 p-10 md:p-24 text-center backdrop-blur-3xl shadow-2xl"
                >
                    {/* Animated Border Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-pink-500/30 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-1000" />

                    <div className="relative z-10 flex flex-col items-center gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-primary/20 p-4 rounded-3xl text-primary animate-bounce-slow">
                                <Zap size={32} fill="currentColor" />
                            </div>
                        </motion.div>

                        <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none">
                            Experience the <span className="gradient-text">Future.</span>
                        </h2>

                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Join our private ecosystem of verified professionals and find a connection that actually evolves.
                        </p>

                        <div className="flex flex-wrap justify-center gap-5">
                            {perks.map((perk, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="flex items-center gap-3 text-slate-300 font-bold text-xs uppercase tracking-[0.2em]"
                                >
                                    <CheckCircle2 size={16} className="text-primary" />
                                    {perk}
                                </motion.div>
                            ))}
                        </div>

                        <Link href="/auth/register">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative px-14 py-5 bg-white text-black rounded-full font-black text-xl shadow-[0_20px_60px_rgba(255,255,255,0.15)] transition-all hover:bg-primary hover:text-white"
                            >
                                <span className="relative z-10">Initialize Profile</span>
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

export default CTA;
