import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    isWaitlistModalOpen: boolean;
}

const initialState: UIState = {
    isWaitlistModalOpen: false,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openWaitlistModal: (state) => {
            state.isWaitlistModalOpen = true;
        },
        closeWaitlistModal: (state) => {
            state.isWaitlistModalOpen = false;
        },
        toggleWaitlistModal: (state) => {
            state.isWaitlistModalOpen = !state.isWaitlistModalOpen;
        },
    },
});

export const { openWaitlistModal, closeWaitlistModal, toggleWaitlistModal } = uiSlice.actions;

export default uiSlice.reducer;
