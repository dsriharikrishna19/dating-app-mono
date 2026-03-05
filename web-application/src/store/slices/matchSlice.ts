import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MatchState {
    matches: any[];
    loading: boolean;
}

const initialState: MatchState = {
    matches: [],
    loading: false,
};

const matchSlice = createSlice({
    name: 'match',
    initialState,
    reducers: {
        setMatches: (state, action: PayloadAction<any[]>) => {
            state.matches = action.payload;
        },
    },
});

export const { setMatches } = matchSlice.actions;
export default matchSlice.reducer;
