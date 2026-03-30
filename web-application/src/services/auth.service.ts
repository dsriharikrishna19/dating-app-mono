import { HttpService } from './api';

export const authService = {
  /**
   * Universal login/register entry point.
   */
  authenticate: async (phoneNumber: string, email?: string) => {
    return HttpService.post('/auth/login', { phoneNumber })
      .catch(err => {
        if (err.response?.status === 404) {
          return HttpService.post('/auth/register', { phoneNumber, email });
        }
        throw err;
      });
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
