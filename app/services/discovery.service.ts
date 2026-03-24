import { HttpService } from './api';

export const discoveryService = {
  getProfiles: async (filters?: any) => {
    return HttpService.get('/discovery/feed', filters);
  },
  
  swipe: async (profileId: string, direction: 'LEFT' | 'RIGHT' | 'SUPERLIKE') => {
    return HttpService.post(`/discovery/swipe`, { profileId, direction });
  }
};
