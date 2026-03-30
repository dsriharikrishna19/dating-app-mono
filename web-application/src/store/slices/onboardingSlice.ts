import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnboardingState {
  step: number;
  formData: {
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
  };
}

const initialState: OnboardingState = {
  step: 1,
  formData: {
    name: '',
    birthDate: '',
    gender: '',
    bio: 'Finding meaningful connections.',
    latitude: null,
    longitude: null,
    interests: [],
    images: ['', '', '', '', '', ''], // 6 slots 
    preferences: {
      minAge: 18,
      maxAge: 50,
      maxDistance: 50,
      genderPreference: 'ANY',
    },
  },
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    updateFormData: (state, action: PayloadAction<Partial<OnboardingState['formData']>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    updatePreferences: (state, action: PayloadAction<Partial<OnboardingState['formData']['preferences']>>) => {
      state.formData.preferences = { ...state.formData.preferences, ...action.payload };
    },
    setImage: (state, action: PayloadAction<{ index: number; url: string }>) => {
      state.formData.images[action.payload.index] = action.payload.url;
    },
    resetOnboarding: (state) => {
      return initialState;
    },
  },
});

export const { setStep, updateFormData, updatePreferences, setImage, resetOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;
