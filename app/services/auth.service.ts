import { HttpService } from './api';

export const authService = {
  requestOtp: async (phoneNumber: string) => {
    return HttpService.post('/auth/login', { phoneNumber });
  },

  login: async (phoneNumber: string) => {
    return HttpService.post('/auth/login', { phoneNumber });
  },
  
  register: async (phoneNumber: string) => {
    return HttpService.post('/auth/register', { phoneNumber });
  },
  
  verifyOtp: async (phoneNumber: string, otp: string) => {
    return HttpService.post('/auth/verify-otp', { phoneNumber, otp });
  },
  
  resendOtp: async (phoneNumber: string) => {
    return HttpService.post('/auth/resend-otp', { phoneNumber });
  },
  
  logout: async () => {
    return HttpService.post('/auth/logout');
  }
};
