'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { memo, useMemo } from 'react';
import { FOOTER_NAV, FOOTER_SOCIAL } from '@/constants/navigation';

const HomeFooter = memo(function HomeFooter() {
    const footerNav = useMemo(() => FOOTER_NAV, []);
    const footerSocial = useMemo(() => FOOTER_SOCIAL, []);

    return (
        <footer className="mt-auto py-16 px-4 border-t border-white/5 bg-black/20">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
                <div className="col-span-2 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary p-2 rounded-xl">
                            <Heart className="text-white fill-white w-5 h-5" />
                        </div>
                        <span className="text-2xl font-black text-white tracking-tighter">SPARK</span>
                    </div>
                    <p className="text-slate-500 text-base max-w-sm font-medium leading-relaxed">
                        Elevating the dating experience through technology and genuine human connection. Founded in 2026.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <h5 className="text-white font-black uppercase tracking-widest text-xs">Navigation</h5>
                    <ul className="flex flex-col gap-3 text-slate-400 font-bold text-sm">
                        {footerNav.map(({ label, href }) => (
                            <li key={label}>
                                <Link href={href} className="hover:text-primary transition-colors">{label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <h5 className="text-white font-black uppercase tracking-widest text-xs">Connect</h5>
                    <ul className="flex flex-col gap-3 text-slate-400 font-bold text-sm">
                        {footerSocial.map(({ label, href }) => (
                            <li key={label}>
                                <a href={href} className="hover:text-primary transition-colors">{label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-xs font-bold">
                <p>© 2026 Spark Interactive. Designed for Humans.</p>
                <div className="flex gap-6">
                    <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
});

export default HomeFooter;
