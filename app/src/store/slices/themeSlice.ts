import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
    isDarkMode: boolean;
    themeMode: 'light' | 'dark' | 'system';
}

const initialState: ThemeState = {
    isDarkMode: false,
    themeMode: 'system',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setThemeMode: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
            state.themeMode = action.payload;
        },
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
            state.themeMode = state.isDarkMode ? 'dark' : 'light';
        },
        setIsDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
            state.themeMode = action.payload ? 'dark' : 'light';
        },
    },
});

export const { setThemeMode, toggleDarkMode, setIsDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
