import { HttpService } from './api';
import { monitoring } from './monitoring.service';

export const chatService = {
  getMatches: async () => {
    monitoring.trackEvent('chat_matches_fetch');
    return HttpService.get('/chat/matches');
  },
  
  getMessages: async (matchId: string) => {
    return HttpService.get(`/chat/${matchId}/messages`);
  },
  
  sendMessage: async (matchId: string, content: string) => {
    monitoring.trackEvent('chat_message_sent');
    return HttpService.post(`/chat/${matchId}/messages`, { content });
  },

  markAsRead: async (matchId: string) => {
    return HttpService.put(`/chat/${matchId}/read`);
  },

  unmatch: async (matchId: string) => {
    monitoring.trackEvent('chat_unmatch');
    return HttpService.delete(`/chat/matches/${matchId}`);
  }
};
