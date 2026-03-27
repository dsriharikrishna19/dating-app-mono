import { HttpService } from './api';
import { monitoring } from './monitoring.service';

export const discoveryService = {
  getFeed: async (filters?: any) => {
    monitoring.trackEvent('discovery_feed_fetch');
    return HttpService.get('/discovery/feed', filters);
  },
  
  swipe: async (profileId: string, direction: 'LEFT' | 'RIGHT' | 'SUPERLIKE') => {
    monitoring.trackEvent('discovery_swipe', { direction });
    return HttpService.post(`/discovery/swipe`, { profileId, direction });
  },

  getFilters: async () => {
    return HttpService.get('/discovery/filters');
  },

  updateFilters: async (filters: any) => {
    monitoring.trackEvent('discovery_filters_update');
    return HttpService.put('/discovery/filters', filters);
  },

  getLikes: async () => {
    monitoring.trackEvent('discovery_likes_fetch');
    return HttpService.get('/discovery/likes');
  }
};
