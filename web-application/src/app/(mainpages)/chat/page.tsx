'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { MessageCircle, Send } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card } from '@/components/ui/Card';
import { apiGet, apiPost, apiPut } from '@/services/api';
import { CHAT_ENDPOINTS } from '@/services/endpoints/chat.endpoints';
import { USER_ENDPOINTS } from '@/services/endpoints/user.endpoints';

interface MatchItem {
    id: string;
    otherUser: {
        id: string;
        name: string;
        image: string | null;
    };
}

interface ChatMessage {
    id: string;
    senderId: string;
    content: string;
    createdAt: string;
    isRead: boolean;
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export default function ChatPage() {
    const searchParams = useSearchParams();
    const initialMatchId = searchParams.get('matchId');

    const [matches, setMatches] = useState<MatchItem[]>([]);
    const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [loadingMatches, setLoadingMatches] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);

    useEffect(() => {
        const loadInitial = async () => {
            try {
                const [matchesResponse, profileResponse] = await Promise.all([
                    apiGet<ApiResponse<MatchItem[]>>(CHAT_ENDPOINTS.MATCHES),
                    apiGet<ApiResponse<{ user: { id: string } }>>(USER_ENDPOINTS.PROFILE),
                ]);

                const loadedMatches: MatchItem[] = matchesResponse.data.data || [];
                setMatches(loadedMatches);
                setCurrentUserId(profileResponse.data.data?.user?.id || null);

                if (initialMatchId && loadedMatches.some((item: MatchItem) => item.id === initialMatchId)) {
                    setSelectedMatchId(initialMatchId);
                } else if (loadedMatches.length > 0) {
                    setSelectedMatchId(loadedMatches[0].id);
                }
            } catch (error) {
                console.error('Failed to initialize chat page', error);
                setMatches([]);
            } finally {
                setLoadingMatches(false);
            }
        };

        void loadInitial();
    }, [initialMatchId]);

    useEffect(() => {
        const loadMessages = async () => {
            if (!selectedMatchId) {
                setMessages([]);
                return;
            }

            try {
                setLoadingMessages(true);
                const response = await apiGet<ApiResponse<ChatMessage[]>>(CHAT_ENDPOINTS.MESSAGES(selectedMatchId));
                setMessages(response.data.data || []);
                await apiPut(CHAT_ENDPOINTS.MARK_AS_READ(selectedMatchId));
            } catch (error) {
                console.error('Failed to load messages', error);
                setMessages([]);
            } finally {
                setLoadingMessages(false);
            }
        };

        void loadMessages();
    }, [selectedMatchId]);

    const selectedMatch = useMemo(
        () => matches.find((item) => item.id === selectedMatchId) || null,
        [matches, selectedMatchId]
    );

    const handleSend = async (event: FormEvent) => {
        event.preventDefault();
        const content = messageInput.trim();
        if (!content || !selectedMatchId) return;

        try {
            const response = await apiPost<ApiResponse<ChatMessage>>(CHAT_ENDPOINTS.MESSAGES(selectedMatchId), { content });
            setMessages((prev) => [...prev, response.data.data]);
            setMessageInput('');
        } catch (error) {
            console.error('Failed to send message', error);
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-background-dark px-4 py-24">
                <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
                    <Card className="p-4">
                        <h2 className="mb-4 text-xl font-black text-white">Chats</h2>
                        {loadingMatches ? (
                            <div className="py-10 text-center text-slate-400">Loading chats...</div>
                        ) : matches.length === 0 ? (
                            <div className="py-10 text-center text-slate-400">No active chats yet.</div>
                        ) : (
                            <div className="space-y-2">
                                {matches.map((match) => (
                                    <button
                                        key={match.id}
                                        onClick={() => setSelectedMatchId(match.id)}
                                        className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${selectedMatchId === match.id
                                            ? 'border-primary/40 bg-primary/15 text-white'
                                            : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                                            }`}
                                    >
                                        <p className="font-bold">{match.otherUser.name || 'Unknown'}</p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </Card>

                    <Card className="p-0 overflow-hidden">
                        {selectedMatch ? (
                            <>
                                <div className="border-b border-white/10 px-6 py-4">
                                    <p className="text-lg font-black text-white">{selectedMatch.otherUser.name || 'Unknown'}</p>
                                </div>

                                <div className="h-[60vh] overflow-y-auto px-6 py-5 space-y-3 bg-slate-950/30">
                                    {loadingMessages ? (
                                        <p className="text-slate-400">Loading messages...</p>
                                    ) : messages.length === 0 ? (
                                        <p className="text-slate-400">No messages yet. Say hello.</p>
                                    ) : (
                                        messages.map((message) => {
                                            const isOwn = currentUserId && message.senderId === currentUserId;
                                            return (
                                                <div
                                                    key={message.id}
                                                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div
                                                        className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${isOwn
                                                            ? 'bg-primary text-white'
                                                            : 'bg-white/10 text-slate-100'
                                                            }`}
                                                    >
                                                        {message.content}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>

                                <form onSubmit={handleSend} className="border-t border-white/10 p-4 flex items-center gap-3">
                                    <input
                                        value={messageInput}
                                        onChange={(event) => setMessageInput(event.target.value)}
                                        placeholder="Type a message"
                                        className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40"
                                    />
                                    <button
                                        type="submit"
                                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white"
                                    >
                                        <Send size={14} />
                                        Send
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="h-[72vh] flex flex-col items-center justify-center text-center px-6">
                                <MessageCircle size={38} className="text-slate-500 mb-3" />
                                <p className="text-xl font-bold text-white">Select a chat</p>
                                <p className="mt-1 text-slate-400">Choose a match from the left to start messaging.</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </ProtectedRoute>
    );
}
