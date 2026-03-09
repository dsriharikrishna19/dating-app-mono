'use client';

import Link from 'next/link';
import { Compass, MessageCircle, Settings, User, Users } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card } from '@/components/ui/Card';

const QUICK_LINKS = [
    { href: '/discover', label: 'Discovery', icon: Compass, description: 'Find new people nearby.' },
    { href: '/matches', label: 'Matches', icon: Users, description: 'View people you matched with.' },
    { href: '/chat', label: 'Chat', icon: MessageCircle, description: 'Continue your conversations.' },
    { href: '/profile', label: 'Profile', icon: User, description: 'Update your personal profile.' },
    { href: '/settings', label: 'Settings', icon: Settings, description: 'Manage notifications and privacy.' },
];

export default function HomePage() {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-background-dark px-4 py-24">
                <div className="mx-auto w-full max-w-6xl">
                    <h1 className="text-3xl font-black text-white">Welcome Back</h1>
                    <p className="mt-2 text-slate-400">Choose where you want to continue.</p>

                    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {QUICK_LINKS.map(({ href, label, icon: Icon, description }) => (
                            <Link key={href} href={href}>
                                <Card className="h-full p-6" hover>
                                    <Icon size={22} className="text-primary" />
                                    <h2 className="mt-4 text-xl font-black text-white">{label}</h2>
                                    <p className="mt-2 text-sm text-slate-400">{description}</p>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
