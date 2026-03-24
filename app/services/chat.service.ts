import { HttpService } from './api';

export const chatService = {
  getMatches: async () => {
    return HttpService.get('/chat/matches');
  },
  
  getMessages: async (matchId: string) => {
    return HttpService.get(`/chat/${matchId}/messages`);
  },
  
  sendMessage: async (matchId: string, content: string) => {
    return HttpService.post(`/chat/${matchId}/messages`, { content });
  }
};
