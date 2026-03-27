import { HttpService } from './api';
import { monitoring } from './monitoring.service';

export const userService = {
  getProfile: async () => {
    monitoring.trackEvent('profile_fetch_started');
    return HttpService.get('/user/profile');
  },

  onboarding: async (data: any) => {
    monitoring.trackEvent('onboarding_submit');
    return HttpService.post('/user/onboarding', data);
  },
  
  updateProfile: async (data: any) => {
    monitoring.trackEvent('profile_update_started');
    return HttpService.put('/user/profile', data);
  },

  updateSettings: async (settings: any) => {
    monitoring.trackEvent('settings_update_started');
    return HttpService.put('/user/settings', settings);
  },
  
  uploadImage: async (formData: FormData) => {
    monitoring.trackEvent('image_upload_started');
    return HttpService.post('/user/images', formData);
  },

  deleteImage: async (imageId: string) => {
    monitoring.trackEvent('image_delete_started');
    return HttpService.delete(`/user/images/${imageId}`);
  }
};
