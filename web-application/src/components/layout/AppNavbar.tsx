'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Compass, MessageCircle, Settings, User, Users, Sparkles, Menu, X, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '@/store/hooks';
import { logoutUser } from '@/store/slices/authSlice';
import type { ComponentType } from 'react';

interface AppNavLink {
    label: string;
    href: string;
    icon: ComponentType<{ className?: string; size?: number }>;
}

const APP_NAV_LINKS: AppNavLink[] = [
    { label: 'Home', href: '/home', icon: Sparkles },
    { label: 'Discovery', href: '/discover', icon: Compass },
    { label: 'Matches', href: '/matches', icon: Users },
    { label: 'Chat', href: '/chat', icon: MessageCircle },
    // { label: 'Profile', href: '/profile', icon: User },
    { label: 'Settings', href: '/settings', icon: Settings },
];

export default function AppNavbar() {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
        } catch (error) {
            console.error('Logout request failed:', error);
        } finally {
            router.push('/auth/login');
        }
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-slate-950/85 backdrop-blur-md px-6">
                <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between">
                    <Link href="/discover" className="flex items-center gap-2 group">
                        <motion.div
                            whileHover={{ rotate: 10, scale: 1.05 }}
                            className="rounded-xl bg-primary p-2 shadow-[0_0_15px_rgba(255,68,88,0.3)]"
                        >
                            <Sparkles className="h-5 w-5 text-white" />
                        </motion.div>
                        <span className="text-xl font-black tracking-tight text-white">SPARK</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-2">
                        {APP_NAV_LINKS.map(({ label, href, icon: Icon }) => {
                            const isActive = pathname === href;

                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors ${isActive
                                        ? 'bg-primary/20 text-primary border border-primary/30'
                                        : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                                        }`}
                                >
                                    <Icon size={16} />
                                    <span>{label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="hidden md:flex items-center">
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>

                    <button
                        onClick={() => setMobileOpen((prev) => !prev)}
                        className="md:hidden p-2 text-white hover:text-primary transition-colors"
                        aria-label="Toggle app menu"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            {mobileOpen && (
                <div className="fixed top-16 left-0 right-0 z-40 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl md:hidden">
                    <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4">
                        {APP_NAV_LINKS.map(({ label, href, icon: Icon }) => {
                            const isActive = pathname === href;

                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`inline-flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-colors ${isActive
                                        ? 'bg-primary/20 text-primary border border-primary/30'
                                        : 'text-slate-300 hover:text-white hover:bg-white/5 border border-white/10'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span>{label}</span>
                                </Link>
                            );
                        })}
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
