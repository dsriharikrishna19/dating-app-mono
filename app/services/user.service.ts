import { HttpService } from './api';

export const userService = {
  getProfile: async () => {
    return HttpService.get('/user/profile');
  },

  onboarding: async (data: any) => {
    return HttpService.post('/user/onboarding', data);
  },
  
  updateProfile: async (data: any) => {
    return HttpService.put('/user/profile', data);
  },
  
  uploadImage: async (formData: FormData) => {
    return HttpService.post('/user/images', formData);
  }
};
