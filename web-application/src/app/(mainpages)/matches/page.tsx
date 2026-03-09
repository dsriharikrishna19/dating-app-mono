'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Users } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card } from '@/components/ui/Card';
import { apiGet } from '@/services/api';
import { CHAT_ENDPOINTS } from '@/services/endpoints/chat.endpoints';

interface MatchItem {
    id: string;
    otherUser: {
        id: string;
        name: string;
        image: string | null;
    };
    lastMessage: {
        content: string;
    } | null;
    updatedAt: string;
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export default function MatchesPage() {
    const [matches, setMatches] = useState<MatchItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMatches = async () => {
            try {
                const response = await apiGet<ApiResponse<MatchItem[]>>(CHAT_ENDPOINTS.MATCHES);
                setMatches(response.data.data || []);
            } catch (error) {
                console.error('Failed to load matches', error);
                setMatches([]);
            } finally {
                setLoading(false);
            }
        };

        void loadMatches();
    }, []);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-background-dark px-4 py-24">
                <div className="mx-auto w-full max-w-5xl">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black text-white">Your Matches</h1>
                            <p className="text-slate-400 mt-1">People who matched with you.</p>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-200">
                            <Users size={16} />
                            {matches.length} matches
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                        </div>
                    ) : matches.length === 0 ? (
                        <Card className="p-10 text-center">
                            <p className="text-xl font-bold text-white">No matches yet</p>
                            <p className="mt-2 text-slate-400">Start swiping in Discovery to find connections.</p>
                            <Link
                                href="/discover"
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white"
                            >
                                <Users size={16} />
                                Go to Discovery
                            </Link>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {matches.map((match) => (
                                <Card key={match.id} className="p-5" hover>
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-lg font-bold text-white">{match.otherUser.name || 'Unknown'}</p>
                                            <p className="mt-1 text-sm text-slate-400">
                                                {match.lastMessage?.content || 'No messages yet'}
                                            </p>
                                        </div>
                                        <Link
                                            href={`/chat?matchId=${match.id}`}
                                            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-slate-200 hover:bg-white/10"
                                        >
                                            <MessageCircle size={14} />
                                            Open Chat
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}
