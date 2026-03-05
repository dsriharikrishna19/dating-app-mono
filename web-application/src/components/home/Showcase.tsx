'use client';

import { motion } from 'framer-motion';
import { forwardRef, memo, useMemo } from 'react';
import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import { SHOWCASE_PROFILES } from '@/data/showcaseProfiles';
import { Badge } from '@/components/ui/Badge';

const Showcase = memo(forwardRef<HTMLDivElement>((props, ref) => {
    const profiles = useMemo(() => SHOWCASE_PROFILES, []);

    return (
        <section ref={ref} id="showcase" className="py-10 px-4 max-w-7xl mx-auto w-full relative overflow-hidden">
            <div className="flex flex-col items-center gap-4 text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <Badge variant="primary">
                        <Star size={10} fill="currentColor" />
                        Curated Connections
                    </Badge>
                </motion.div>
                <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-tight">
                    Find Your <span className="gradient-text">Perfect</span> Soul.
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                    Meet the extraordinary individuals who make our community unique. We prioritize depth, ambition, and authentic chemistry.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {profiles.map((profile, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.8, ease: 'easeOut' }}
                        whileHover={{ y: -12 }}
                        className="group relative h-[480px] rounded-[2.5rem] overflow-hidden bg-slate-900 border border-white/5 hover:border-primary/30 transition-all shadow-2xl"
                    >
                        {/* Profile Image */}
                        <div className="absolute inset-0 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 bg-slate-800">
                            <Image
                                src={profile.image}
                                alt={profile.name}
                                fill
                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                        </div>

                        {/* Profile Info */}
                        <div className="absolute bottom-0 left-0 p-6 w-full z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="bg-primary/20 p-1.5 rounded-lg text-primary">
                                        <Heart size={12} fill="currentColor" />
                                    </div>
                                    <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Matched 98%</span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <h3 className="text-2xl font-black text-white tracking-tight">
                                        {profile.name}, <span className="text-slate-400">{profile.age}</span>
                                    </h3>
                                    <p className="text-primary text-sm font-bold tracking-tight line-clamp-1">{profile.role}</p>
                                </div>

                                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                    {profile.tags.map((tag, j) => (
                                        <Badge key={j} variant="default" size="sm">{tag}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Glassmorphism Shine */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center mt-12">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full font-black text-sm uppercase tracking-widest text-white hover:bg-white/10 transition-all"
                >
                    Explore All Souls
                </motion.button>
            </div>
        </section>
    );
}));

Showcase.displayName = 'Showcase';

export default Showcase;
