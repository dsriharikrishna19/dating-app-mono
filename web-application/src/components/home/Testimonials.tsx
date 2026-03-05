'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { memo, useMemo } from 'react';
import { TESTIMONIALS_DATA } from '@/data/testimonials';
import { Badge } from '@/components/ui/Badge';

const Testimonials = memo(function Testimonials() {
    const testimonials = useMemo(() => TESTIMONIALS_DATA, []);

    return (
        <section className="py-24 px-4 max-w-7xl mx-auto w-full">
            <div className="flex flex-col gap-4 text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <Badge variant="primary">
                        <Star size={10} fill="currentColor" />
                        Success Stories
                    </Badge>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight"
                >
                    Real <span className="gradient-text">Connections.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-slate-400 max-w-xl mx-auto font-medium leading-relaxed"
                >
                    From first match to forever — hear from people who found what they were looking for.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.7, ease: 'easeOut' }}
                        whileHover={{ y: -6 }}
                        className="glass-card p-8 flex flex-col gap-5 group hover:border-white/20 transition-all"
                    >
                        {/* Match badge */}
                        <div className="flex items-center justify-between">
                            <Badge variant="primary">
                                {t.matchPercent}% Match with {t.partnerName}
                            </Badge>
                            <Quote size={20} className="text-primary/30 group-hover:text-primary/60 transition-colors" />
                        </div>

                        {/* Quote */}
                        <p className="text-slate-300 leading-relaxed text-sm font-medium flex-grow italic">
                            &ldquo;{t.quote}&rdquo;
                        </p>

                        {/* Stars */}
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <Star key={j} size={12} fill="currentColor" className="text-primary" />
                            ))}
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl flex-shrink-0">
                                {t.avatar}
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-white font-black text-sm tracking-tight">{t.name}</span>
                                <span className="text-slate-500 text-xs font-medium">{t.role}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
});

export default Testimonials;
