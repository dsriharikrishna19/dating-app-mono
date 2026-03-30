import { HttpService } from './api';

export interface OnboardingData {
  name: string;
  birthDate: string;
  gender: string;
  bio: string;
  latitude: number | null;
  longitude: number | null;
  interests: string[];
  images: string[];
  preferences: {
    minAge: number;
    maxAge: number;
    maxDistance: number;
    genderPreference: string;
  };
}

export const userService = {
  /**
   * Complete user onboarding and create profile.
   */
  completeOnboarding: async (data: OnboardingData) => {
    return HttpService.post('/user/onboarding', data);
  },

  /**
   * Fetch current user profile.
   */
  getProfile: async () => {
    return HttpService.get('/user/profile');
  },

  /**
   * Update existing profile.
   */
  updateProfile: async (data: Partial<OnboardingData>) => {
    return HttpService.put('/user/profile', data);
  },

  /**
   * Upload profile images.
   */
  uploadImages: async (urls: string[]) => {
    return HttpService.post('/user/images', { urls });
  }
};
