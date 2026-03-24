import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  notifications: {
    matches: boolean;
    messages: boolean;
    promos: boolean;
  };
  visibility: {
    profileVisible: boolean;
    ghostMode: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  language: string;
}

const initialState: SettingsState = {
  notifications: {
    matches: true,
    messages: true,
    promos: false,
  },
  visibility: {
    profileVisible: true,
    ghostMode: false,
  },
  theme: 'system',
  language: 'en',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateNotification: (state, action: PayloadAction<Partial<SettingsState['notifications']>>) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    updateVisibility: (state, action: PayloadAction<Partial<SettingsState['visibility']>>) => {
      state.visibility = { ...state.visibility, ...action.payload };
    },
    setTheme: (state, action: PayloadAction<SettingsState['theme']>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    resetSettings: () => initialState,
  },
});

export const { updateNotification, updateVisibility, setTheme, setLanguage, resetSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
