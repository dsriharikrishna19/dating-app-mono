'use client';

import { ShieldCheck, Zap, MessageCircle } from 'lucide-react';
import { forwardRef, memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FEATURES_DATA } from '@/constants/features';

const iconMap = {
    zap: Zap,
    shield: ShieldCheck,
    message: MessageCircle,
};

const Features = memo(forwardRef<HTMLDivElement>((props, ref) => {
    const features = useMemo(() => FEATURES_DATA, []);

    return (
        <section ref={ref} id="features" className="py-24 px-4 max-w-7xl mx-auto w-full relative">
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                <div className="flex flex-col gap-4 max-w-xl">
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-tight"
                    >
                        Dating <motion.span
                            initial={{ color: '#ffffff' }}
                            whileInView={{ color: '#FF4458' }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="italic"
                        >
                            Reimagined.
                        </motion.span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-400 font-medium leading-relaxed"
                    >
                        Merging behavioral science with elite technology to architect the perfect match. Experience the next level of connection.
                    </motion.p>
                </div>
                <div className="flex gap-3">
                    {[1, 2, 3].map(i => (
                        <motion.div
                            key={i}
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                            className={`w-3 h-3 rounded-full ${i === 1 ? 'bg-primary' : i === 2 ? 'bg-secondary' : 'bg-pink-500'}`}
                        />
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {features.map((feature, i) => {
                    const Icon = iconMap[feature.iconKey];
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="feature-card glass-card p-10 group hover:border-white/20 transition-all cursor-default relative overflow-hidden"
                        >
                            <div className={`absolute -top-20 -right-20 w-40 h-40 ${feature.bg} rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="flex flex-col gap-5">
                                <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center ${feature.color} group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-lg ${feature.accent}`}>
                                    <Icon size={24} />
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h3 className="text-xl font-black text-white tracking-tight group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-500 leading-relaxed font-medium text-sm group-hover:text-slate-400 transition-colors">
                                        {feature.desc}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-white transition-colors">
                                    <span>Learn Technology</span>
                                    <div className="w-8 h-[1px] bg-slate-800 group-hover:bg-primary group-hover:w-12 transition-all" />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}));

Features.displayName = 'Features';

export default Features;
