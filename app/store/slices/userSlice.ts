import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Profile {
  id: string;
  name: string;
  bio: string;
  birthDate?: string;
  gender?: string;
  lookingFor?: string;
  location?: string;
  images: Array<{ id: string; url: string; isPrimary: boolean }>;
  interests: Array<{ id: string; name: string }>;
  isGold?: boolean;
}

interface UserState {
  profile: Profile | null;
  likesRemaining: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  likesRemaining: 10,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<Profile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setGold: (state, action: PayloadAction<boolean>) => {
      if (state.profile) {
        state.profile.isGold = action.payload;
      }
    },
    decrementLikes: (state) => {
      if (!state.profile?.isGold && state.likesRemaining > 0) {
        state.likesRemaining -= 1;
      }
    },
    resetLikes: (state) => {
      state.likesRemaining = 10;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
  },
});

export const { setProfile, updateProfile, setGold, decrementLikes, resetLikes, setLoading, setError, clearProfile } = userSlice.actions;
export default userSlice.reducer;
