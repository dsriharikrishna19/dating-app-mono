import { HttpService } from './api';

export const settingsService = {
  getConfig: async () => {
    return HttpService.get('/settings/config');
  },

  getNotifications: async () => {
    return HttpService.get('/settings/notifications');
  },

  updateNotifications: async (data: { newMatches: boolean; messages: boolean; promotions: boolean }) => {
    return HttpService.put('/settings/notifications', data);
  },

  updatePrivacy: async (data: { profileVisible: boolean; ghostMode: boolean }) => {
    return HttpService.put('/settings/privacy', data);
  },

  deleteAccount: async () => {
    return HttpService.delete('/settings/account');
  }
};
