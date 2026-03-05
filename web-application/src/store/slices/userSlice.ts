import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiGet, apiPut, apiPost } from '@/services/api';
import { USER_ENDPOINTS } from '@/services/endpoints/user.endpoints';
import { ERROR_MESSAGES } from '@/constants/messages';

interface UserState {
    profile: any | null;
    discoverUsers: any[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    profile: null,
    discoverUsers: [],
    loading: false,
    error: null,
};

export const getDiscoverUsers = createAsyncThunk('user/getDiscoverUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await apiGet(USER_ENDPOINTS.DISCOVERY);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || ERROR_MESSAGES.DISCOVERY.FETCH_FAILED);
    }
});

export const updateProfile = createAsyncThunk('user/updateProfile', async (data: any, { rejectWithValue }) => {
    try {
        const response = await apiPut(USER_ENDPOINTS.PROFILE, data);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || ERROR_MESSAGES.PROFILE.UPDATE_FAILED);
    }
});

export const getProfile = createAsyncThunk('user/getProfile', async (_, { rejectWithValue }) => {
    try {
        const response = await apiGet(USER_ENDPOINTS.PROFILE);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || ERROR_MESSAGES.PROFILE.FETCH_FAILED);
    }
});

export const onboardUser = createAsyncThunk('user/onboard', async (data: any, { rejectWithValue }) => {
    try {
        const response = await apiPost(USER_ENDPOINTS.ONBOARDING, data);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || ERROR_MESSAGES.USER.ONBOARDING_FAILED);
    }
});

export const uploadPhoto = createAsyncThunk('user/uploadPhoto', async (formData: FormData, { rejectWithValue }) => {
    try {
        const response = await apiPost(USER_ENDPOINTS.UPLOAD_PHOTO, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || ERROR_MESSAGES.USER.PHOTO_UPLOAD_FAILED);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<any>) => {
            state.profile = action.payload;
        },
    },
    extraReducers: (builder) => {
        // getDiscoverUsers
        builder.addCase(getDiscoverUsers.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(getDiscoverUsers.fulfilled, (state, action) => { state.loading = false; state.discoverUsers = action.payload; })
            .addCase(getDiscoverUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

        // updateProfile
        builder.addCase(updateProfile.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(updateProfile.fulfilled, (state, action) => { state.loading = false; state.profile = action.payload; })
            .addCase(updateProfile.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

        // getProfile
        builder.addCase(getProfile.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(getProfile.fulfilled, (state, action) => { state.loading = false; state.profile = action.payload; })
            .addCase(getProfile.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

        // onboardUser
        builder.addCase(onboardUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(onboardUser.fulfilled, (state, action) => { state.loading = false; state.profile = action.payload; })
            .addCase(onboardUser.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

        // uploadPhoto
        builder.addCase(uploadPhoto.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(uploadPhoto.fulfilled, (state, action) => { state.loading = false; state.profile = action.payload; })
            .addCase(uploadPhoto.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
    },
});

export const { setProfile } = userSlice.actions;
export default userSlice.reducer;
