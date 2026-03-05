'use client';

import { motion } from 'framer-motion';
import { UserPlus, Brain, MessageCircle } from 'lucide-react';
import { memo, useMemo } from 'react';
import { HOW_IT_WORKS_STEPS } from '@/constants/howItWorks';

const iconMap = {
    'user-plus': UserPlus,
    'brain': Brain,
    'message-circle': MessageCircle,
};

const HowItWorks = memo(function HowItWorks() {
    const steps = useMemo(() => HOW_IT_WORKS_STEPS, []);

    return (
        <section className="py-24 px-4 max-w-7xl mx-auto w-full">
            <div className="flex flex-col gap-4 text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] uppercase tracking-widest font-black">
                        Simple Process
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight"
                >
                    How <span className="gradient-text">Spark</span> Works
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-slate-400 max-w-xl mx-auto font-medium leading-relaxed"
                >
                    Three effortless steps to find a connection that actually lasts.
                </motion.p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {/* Connector line on desktop */}
                <div className="hidden md:block absolute top-10 left-[16.5%] right-[16.5%] h-[1px] bg-gradient-to-r from-primary/30 via-secondary/30 to-pink-500/30" />

                {steps.map((step, i) => {
                    const Icon = iconMap[step.iconKey];
                    return (
                        <motion.div
                            key={step.step}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
                            className="glass-card p-8 flex flex-col gap-5 relative group hover:border-white/20 transition-all"
                        >
                            {/* Step number bubble */}
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl ${step.bg} flex items-center justify-center ${step.color} group-hover:scale-110 transition-transform shadow-lg`}>
                                    <Icon size={22} />
                                </div>
                                <span className="text-5xl font-black text-white/5 leading-none select-none">
                                    0{step.step}
                                </span>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h3 className={`text-xl font-black text-white tracking-tight group-hover:${step.color} transition-colors`}>
                                    {step.title}
                                </h3>
                                <p className="text-slate-500 leading-relaxed text-sm font-medium group-hover:text-slate-400 transition-colors">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
});

export default HowItWorks;
