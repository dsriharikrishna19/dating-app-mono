import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiPost } from '@/services/api';
import { MATCH_ENDPOINTS } from '@/services/endpoints/match.endpoints';
import { ERROR_MESSAGES } from '@/constants/messages';

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

interface MatchState {
    matches: any[];
    loading: boolean;
    error: string | null;
}

const initialState: MatchState = {
    matches: [],
    loading: false,
    error: null,
};

export const likeUser = createAsyncThunk('match/like', async (targetUserId: string, { rejectWithValue }) => {
    try {
        const response = await apiPost<ApiResponse<{ match: boolean; matchId: string | null }>>(MATCH_ENDPOINTS.SWIPE, {
            targetUserId,
            action: 'LIKE',
        });
        return response.data.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || ERROR_MESSAGES.MATCH.LIKE_FAILED);
    }
});

export const passUser = createAsyncThunk('match/pass', async (targetUserId: string, { rejectWithValue }) => {
    try {
        const response = await apiPost<ApiResponse<{ match: boolean; matchId: string | null }>>(MATCH_ENDPOINTS.SWIPE, {
            targetUserId,
            action: 'NOPE',
        });
        return response.data.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || ERROR_MESSAGES.MATCH.PASS_FAILED);
    }
});

const matchSlice = createSlice({
    name: 'match',
    initialState,
    reducers: {
        setMatches: (state, action: PayloadAction<any[]>) => {
            state.matches = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(likeUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(likeUser.fulfilled, (state) => { state.loading = false; })
            .addCase(likeUser.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

        builder.addCase(passUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(passUser.fulfilled, (state) => { state.loading = false; })
            .addCase(passUser.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
    },
});

export const { setMatches } = matchSlice.actions;
export default matchSlice.reducer;
