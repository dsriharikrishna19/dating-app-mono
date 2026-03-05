import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
    conversations: any[];
    loading: boolean;
}

const initialState: ChatState = {
    conversations: [],
    loading: false,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setConversations: (state, action: PayloadAction<any[]>) => {
            state.conversations = action.payload;
        },
    },
});

export const { setConversations } = chatSlice.actions;
export default chatSlice.reducer;
