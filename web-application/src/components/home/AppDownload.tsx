'use client';

import { motion } from 'framer-motion';
import { Smartphone, Zap, ShieldCheck, Globe } from 'lucide-react';
import { memo, useMemo } from 'react';
import Link from 'next/link';

const APP_FEATURES = [
    { icon: Zap, label: 'AI Matching' },
    { icon: ShieldCheck, label: 'Verified Only' },
    { icon: Globe, label: '150+ Cities' },
    { icon: Smartphone, label: 'Free Forever' },
];

const AppDownload = memo(function AppDownload() {
    const pills = useMemo(() => APP_FEATURES, []);

    return (
        <section className="py-24 px-4 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="glass-card p-10 md:p-16 overflow-hidden relative"
                >
                    {/* Subtle gradient border shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-pink-500/5 pointer-events-none rounded-[1.5rem]" />

                    <div className="relative z-10 flex flex-col gap-8 items-center text-center">
                        {/* Icon */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_40px_rgba(255,68,88,0.3)]"
                        >
                            <Smartphone size={28} className="text-white" />
                        </motion.div>

                        {/* Copy */}
                        <div className="flex flex-col gap-4">
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                                Take Spark <span className="gradient-text">Everywhere.</span>
                            </h2>
                            <p className="text-lg text-slate-400 max-w-lg mx-auto font-medium leading-relaxed">
                                Download the app and carry a world of genuine connections in your pocket — absolutely free.
                            </p>
                        </div>

                        {/* Feature pills */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {pills.map(({ icon: Icon, label }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-widest"
                                >
                                    <Icon size={12} className="text-primary" />
                                    {label}
                                </div>
                            ))}
                        </div>

                        {/* Download buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {/* App Store */}
                            <Link href="#">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-3 px-6 py-4 bg-white text-black rounded-2xl font-black hover:bg-white/90 transition-all shadow-[0_10px_40px_rgba(255,255,255,0.1)] cursor-pointer"
                                >
                                    {/* Apple icon SVG */}
                                    <svg width="20" height="24" viewBox="0 0 20 24" fill="currentColor">
                                        <path d="M16.462 12.707c-.028-3.21 2.625-4.77 2.745-4.843-1.502-2.193-3.834-2.493-4.659-2.519-1.975-.2-3.878 1.17-4.882 1.17-1.02 0-2.57-1.145-4.232-1.113-2.15.033-4.153 1.254-5.255 3.165-2.256 3.908-.576 9.67 1.603 12.835 1.08 1.549 2.354 3.283 4.02 3.221 1.624-.065 2.232-1.038 4.19-1.038 1.944 0 2.509 1.038 4.205 1.001 1.743-.03 2.842-1.57 3.9-3.13a17.54 17.54 0 001.757-3.647c-.04-.02-3.37-1.288-3.392-5.102zM13.24 3.544C14.138 2.463 14.742.983 14.56-.5c-1.317.058-2.91.917-3.847 1.976-.844.93-1.584 2.444-1.385 3.885 1.463.11 2.958-.735 3.912-1.817z" />
                                    </svg>
                                    <div className="flex flex-col items-start">
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Download on</span>
                                        <span className="text-sm font-black leading-tight">App Store</span>
                                    </div>
                                </motion.div>
                            </Link>

                            {/* Google Play */}
                            <Link href="#">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black hover:bg-white/10 transition-all cursor-pointer"
                                >
                                    {/* Google Play icon SVG */}
                                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                                        <path d="M.333 1.259C.12 1.49 0 1.856 0 2.33v17.34c0 .474.12.84.333 1.071l.056.054L9.944 11.2v-.209L.39 1.205l-.057.054z" fill="url(#gp1)" />
                                        <path d="M13.222 14.566l-3.278-3.275v-.209l3.278-3.274.074.042 3.883 2.206c1.109.63 1.109 1.661 0 2.292l-3.883 2.206-.074.012z" fill="url(#gp2)" />
                                        <path d="M13.296 14.524L9.944 11.2.333 20.741c.365.387.968.434 1.648.05l11.315-6.267z" fill="url(#gp3)" />
                                        <path d="M13.296 7.476L1.981 1.21C1.301.824.698.872.333 1.259L9.944 10.8l3.352-3.324z" fill="url(#gp4)" />
                                        <defs>
                                            <linearGradient id="gp1" x1="8.936" y1="2.327" x2="-2.896" y2="11.2" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#00A0FF" /><stop offset="1" stopColor="#00BEFF" />
                                            </linearGradient>
                                            <linearGradient id="gp2" x1="18.063" y1="11.2" x2="-.358" y2="11.2" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#FFD601" /><stop offset="1" stopColor="#FF9801" />
                                            </linearGradient>
                                            <linearGradient id="gp3" x1="11.137" y1="13.155" x2="-5.53" y2="29.82" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#FF3A44" /><stop offset="1" stopColor="#C31162" />
                                            </linearGradient>
                                            <linearGradient id="gp4" x1="-2.09" y1="-4.655" x2="5.637" y2="3.07" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#32A071" /><stop offset="1" stopColor="#2DA771" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="flex flex-col items-start">
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Get it on</span>
                                        <span className="text-sm font-black leading-tight">Google Play</span>
                                    </div>
                                </motion.div>
                            </Link>
                        </div>

                        <p className="text-slate-600 text-xs font-bold">No credit card required · Available on iOS & Android</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

export default AppDownload;
