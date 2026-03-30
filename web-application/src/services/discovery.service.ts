import { HttpService } from './api';

export interface DiscoveryUser {
  id: string;
  name: string;
  age: number;
  bio: string;
  distance: number;
  image: string;
  interests: string[];
}

export const discoveryService = {
  /**
   * Fetch potential matches feed.
   */
  getFeed: async () => {
    return HttpService.get('/discovery/feed');
  },

  /**
   * Swipe on a profile.
   * type: 'LIKE', 'PASS', 'SUPERLIKE'
   */
  swipe: async (profileId: string, type: 'LIKE' | 'PASS' | 'SUPERLIKE') => {
    return HttpService.post('/discovery/swipe', { profileId, type });
  },

  /**
   * Get users who liked me.
   */
  getWhoLikesMe: async () => {
    return HttpService.get('/discovery/likes');
  },

  /**
   * Get discovery filters.
   */
  getFilters: async () => {
    return HttpService.get('/discovery/filters');
  },

  /**
   * Update discovery filters.
   */
  updateFilters: async (preferences: any) => {
    return HttpService.put('/discovery/filters', preferences);
  }
};
