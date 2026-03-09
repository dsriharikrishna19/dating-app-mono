'use client';

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { UserCard } from '@/components/dating/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { getDiscoverUsers } from '@/store/slices/userSlice';
import { likeUser, passUser } from '@/store/slices/matchSlice';
import { Heart, X, RotateCcw, Star } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DiscoveryPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { discoverUsers: users, loading } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        void loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            await dispatch(getDiscoverUsers()).unwrap();
        } catch (err) {
            console.error('Failed to load discovery users', err);
        }
    };

    const handleSwipe = async (direction: 'left' | 'right', targetUser: any) => {
        try {
            if (direction === 'right') {
                const response = await dispatch(likeUser(targetUser.id)).unwrap();
                if (response.match) {
                    alert("It's a match!");
                }
            } else {
                await dispatch(passUser(targetUser.id)).unwrap();
            }
        } catch (err) {
            console.error(`Failed to ${direction === 'right' ? 'like' : 'pass'} user`, err);
        }
    };

    if (loading && users.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background pt-20">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 bg-background overflow-hidden pt-24">
                <div className="relative w-full max-w-[400px] aspect-[3/4] mb-8">
                    <AnimatePresence>
                        {users.length > 0 ? (
                            users
                                .map((user: any) => (
                                    <UserCard
                                        key={user.id}
                                        user={user}
                                        onSwipe={(dir) => handleSwipe(dir, user)}
                                    />
                                ))
                                .slice(0, 2)
                                .reverse()
                        ) : (
                            <div className="glass-card h-full w-full flex flex-col items-center justify-center text-center p-8">
                                <h3 className="text-2xl font-bold text-white mb-2">No more people!</h3>
                                <p className="text-slate-400 mb-6">Try expanding your search distance or filters.</p>
                                <button
                                    onClick={() => void loadUsers()}
                                    className="px-6 py-2 bg-primary rounded-full font-bold text-white"
                                >
                                    Refresh
                                </button>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {users.length > 0 && (
                    <div className="flex items-center gap-6 mt-4">
                        <button className="p-4 bg-white/5 border border-white/10 rounded-full text-yellow-500 hover:scale-110 transition-transform">
                            <RotateCcw size={24} />
                        </button>
                        <button
                            onClick={() => void handleSwipe('left', users[0])}
                            className="p-5 bg-white/5 border border-white/10 rounded-full text-red-500 hover:scale-110 transition-transform shadow-lg shadow-red-500/10"
                        >
                            <X size={32} />
                        </button>
                        <button className="p-4 bg-white/5 border border-white/10 rounded-full text-blue-400 hover:scale-110 transition-transform">
                            <Star size={24} />
                        </button>
                        <button
                            onClick={() => void handleSwipe('right', users[0])}
                            className="p-5 bg-white/5 border border-white/10 rounded-full text-green-500 hover:scale-110 transition-transform shadow-lg shadow-green-500/10"
                        >
                            <Heart size={32} />
                        </button>
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}
