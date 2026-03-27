import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DiscoveryProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  birthDate?: string;
  gender?: string;
  images: Array<{ id: string; url: string; isPrimary: boolean }>;
  interests: Array<{ id: string; name: string }>;
  distance?: string;
}

interface DiscoveryState {
  profiles: DiscoveryProfile[];
  currentIndex: number;
  filters: {
    gender?: string;
    minAge?: number;
    maxAge?: number;
    maxDistance?: number;
  };
  passportLocation: { lat: number; lng: number; name: string } | null;
  isLoading: boolean;
  exhausted: boolean;
  error: string | null;
}

const initialState: DiscoveryState = {
  profiles: [],
  currentIndex: 0,
  filters: {
    minAge: 18,
    maxAge: 100,
    maxDistance: 50,
  },
  passportLocation: null,
  isLoading: false,
  exhausted: false,
  error: null,
};

const discoverySlice = createSlice({
  name: 'discovery',
  initialState,
  reducers: {
    setProfiles: (state, action: PayloadAction<DiscoveryProfile[]>) => {
      state.profiles = action.payload;
      state.currentIndex = 0;
    },
    nextProfile: (state) => {
      state.currentIndex += 1;
    },
    updateFilters: (state, action: PayloadAction<Partial<DiscoveryState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPassportLocation: (state, action: PayloadAction<{ lat: number; lng: number; name: string } | null>) => {
      state.passportLocation = action.payload;
    },
    setExhausted: (state, action: PayloadAction<boolean>) => {
      state.exhausted = action.payload;
    },
    resetDiscovery: (state) => {
      state.profiles = [];
      state.currentIndex = 0;
      state.exhausted = false;
    },
  },
});

export const { 
  setProfiles, 
  nextProfile, 
  updateFilters, 
  setLoading, 
  setError, 
  resetDiscovery, 
  setExhausted,
  setPassportLocation
} = discoverySlice.actions;
export default discoverySlice.reducer;
