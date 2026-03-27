import { HttpService } from './api';
import { monitoring } from './monitoring.service';

export const authService = {
  /**
   * Universal login/register entry point.
   * Returns requiresVerification: true if OTP is needed.
   */
  authenticate: async (phoneNumber: string) => {
    monitoring.trackEvent('auth_request_started', { phoneNumber });
    return HttpService.post('/auth/login', { phoneNumber })
      .catch(err => {
        // If login fails because user doesn't exist, try register
        if (err.response?.status === 404) {
          return HttpService.post('/auth/register', { phoneNumber });
        }
        throw err;
      });
  },

  verifyOtp: async (phoneNumber: string, otp: string) => {
    monitoring.trackEvent('auth_verify_started');
    return HttpService.post('/auth/verify-otp', { phoneNumber, otp });
  },
  
  resendOtp: async (phoneNumber: string) => {
    monitoring.trackEvent('auth_resend_otp');
    return HttpService.post('/auth/resend-otp', { phoneNumber });
  },
  
  logout: async () => {
    monitoring.trackEvent('auth_logout');
    return HttpService.post('/auth/logout');
  }
};
