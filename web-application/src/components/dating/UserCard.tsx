'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Heart, X, Info } from 'lucide-react';
import { memo, useCallback } from 'react';
import Image from 'next/image';

interface UserProfile {
    name: string;
    bio?: string;
    birthDate?: string;
}

interface UserImage {
    url: string;
}

interface User {
    id: string;
    profile?: UserProfile;
    images?: UserImage[];
}

interface UserCardProps {
    user: User;
    onSwipe: (direction: 'left' | 'right') => void;
}

export const UserCard = memo(function UserCard({ user, onSwipe }: UserCardProps) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

    const likeOpacity = useTransform(x, [50, 150], [0, 1]);
    const nopeOpacity = useTransform(x, [-150, -50], [1, 0]);

    const handleDragEnd = useCallback((_: unknown, info: { offset: { x: number } }) => {
        if (info.offset.x > 100) {
            onSwipe('right');
        } else if (info.offset.x < -100) {
            onSwipe('left');
        }
    }, [onSwipe]);

    const age = user.profile?.birthDate
        ? new Date().getFullYear() - new Date(user.profile.birthDate).getFullYear()
        : null;

    return (
        <motion.div
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
            <div className="glass-card h-full w-full overflow-hidden flex flex-col relative">
                {/* Swiping Indicators */}
                <motion.div style={{ opacity: likeOpacity }} className="absolute top-10 left-10 border-4 border-green-500 rounded-lg px-4 py-2 rotate-[-15deg] z-20">
                    <span className="text-green-500 text-4xl font-black uppercase">Like</span>
                </motion.div>
                <motion.div style={{ opacity: nopeOpacity }} className="absolute top-10 right-10 border-4 border-red-500 rounded-lg px-4 py-2 rotate-[15deg] z-20">
                    <span className="text-red-500 text-4xl font-black uppercase">Nope</span>
                </motion.div>

                {/* User Image */}
                <div className="flex-grow bg-slate-800 relative">
                    {user.images?.[0]?.url ? (
                        <Image
                            src={user.images[0].url}
                            alt={user.profile?.name ?? 'User'}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900">
                            <span className="text-8xl">👤</span>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute bottom-0 left-0 p-6 w-full">
                        <div className="flex items-end justify-between gap-4">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-3xl font-bold text-white">
                                    {user.profile?.name ?? 'Unknown'}{age !== null && `, ${age}`}
                                </h3>
                                <p className="text-slate-300 text-sm max-w-[80%] line-clamp-2">
                                    {user.profile?.bio ?? 'No bio yet...'}
                                </p>
                            </div>
                            <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors flex-shrink-0">
                                <Info size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});
