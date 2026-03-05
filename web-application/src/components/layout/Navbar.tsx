'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { NAV_LINKS } from '@/constants/navigation';

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const navBackground = useTransform(
        scrollY,
        [0, 50],
        ['rgba(15, 23, 42, 0)', 'rgba(15, 23, 42, 0.8)']
    );

    const navBorder = useTransform(
        scrollY,
        [0, 50],
        ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.05)']
    );

    useEffect(() => {
        return scrollY.on('change', (latest) => {
            setIsScrolled(latest > 50);
        });
    }, [scrollY]);

    const handleMenuToggle = useCallback(() => {
        setMobileOpen(prev => !prev);
    }, []);

    const handleLinkClick = useCallback(() => {
        setMobileOpen(false);
    }, []);

    const navLinks = useMemo(() => NAV_LINKS, []);

    return (
        <>
            <motion.nav
                style={{
                    backgroundColor: navBackground,
                    borderBottom: `1px solid`,
                    borderColor: navBorder,
                    backdropFilter: isScrolled ? 'blur(12px)' : 'none'
                }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 h-16 items-center px-6"
            >
                <div className="w-full max-w-7xl flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <motion.div
                            whileHover={{ rotate: 12, scale: 1.1 }}
                            className="bg-primary p-2 rounded-xl shadow-[0_0_15px_rgba(255,68,88,0.3)]"
                        >
                            <Sparkles className="text-white w-5 h-5" />
                        </motion.div>
                        <span className="text-2xl font-black text-white tracking-tighter">SPARK</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                        {navLinks.map(({ label, href }) => (
                            <Link key={label} href={href} className="hover:text-white transition-colors">
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center gap-5">
                        <Link href="/auth/login" className="text-xs font-black uppercase tracking-widest text-white hover:text-primary transition-colors">
                            Login
                        </Link>
                        <Link href="/auth/register">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2.5 bg-primary text-white text-[11px] font-black uppercase tracking-widest rounded-full shadow-[0_8px_25px_rgba(255,68,88,0.25)] hover:shadow-[0_8px_30px_rgba(255,68,88,0.4)] transition-all"
                            >
                                Join Spark
                            </motion.button>
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={handleMenuToggle}
                        className="md:hidden p-2 text-white hover:text-primary transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="fixed top-16 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 px-6 py-6"
                >
                    <div className="flex flex-col gap-4 max-w-7xl mx-auto">
                        {navLinks.map(({ label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                onClick={handleLinkClick}
                                className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors py-1"
                            >
                                {label}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                            <Link href="/auth/login" onClick={handleLinkClick} className="text-sm font-black uppercase tracking-widest text-white hover:text-primary transition-colors py-1">
                                Login
                            </Link>
                            <Link href="/auth/register" onClick={handleLinkClick}>
                                <button className="w-full px-6 py-3 bg-primary text-white text-sm font-black uppercase tracking-widest rounded-full shadow-[0_8px_25px_rgba(255,68,88,0.25)] transition-all">
                                    Join Spark
                                </button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
}
