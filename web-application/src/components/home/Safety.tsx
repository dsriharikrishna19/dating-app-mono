'use client';

import { motion } from 'framer-motion';
import { Fingerprint, EyeOff, ShieldAlert, Lock, ShieldCheck } from 'lucide-react';
import { memo, useMemo } from 'react';
import { SAFETY_FEATURES } from '@/constants/safety';
import { Badge } from '@/components/ui/Badge';

const iconMap = {
    'fingerprint': Fingerprint,
    'eye-off': EyeOff,
    'shield-alert': ShieldAlert,
    'lock': Lock,
};

const Safety = memo(function Safety() {
    const features = useMemo(() => SAFETY_FEATURES, []);

    return (
        <section id="safety" className="py-24 px-4 w-full relative overflow-hidden bg-white/[0.01] border-y border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                {/* Text Content */}
                <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex justify-center lg:justify-start"
                    >
                        <Badge variant="secondary">
                            <ShieldCheck size={10} fill="currentColor" />
                            Bank-Level Security
                        </Badge>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-tight"
                    >
                        Your Safety is our <span className="text-secondary">Obsession.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-400 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0"
                    >
                        We built Spark to be the safest dating ecosystem on the planet. From mandatory biometric verification to encrypted chats, you are protected at every turn.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {features.map((feature, i) => {
                        const Icon = iconMap[feature.iconKey];
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="glass-card p-6 flex flex-col gap-4 group hover:bg-secondary/5 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                                    <Icon size={20} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-white font-black tracking-tight">{feature.title}</h3>
                                    <p className="text-slate-500 text-sm font-medium leading-relaxed group-hover:text-slate-400 transition-colors">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
});

export default Safety;
