export const CHAT_ENDPOINTS = {
    MATCHES: '/chat/matches',
    MESSAGES: (matchId: string) => `/chat/${matchId}/messages`,
    MARK_AS_READ: (matchId: string) => `/chat/${matchId}/read`,
};

