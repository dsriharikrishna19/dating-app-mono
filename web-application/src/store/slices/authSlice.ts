import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiPost } from '@/services/api';
import { AUTH_ENDPOINTS } from '@/services/endpoints/auth.endpoints';
import { ERROR_MESSAGES } from '@/constants/messages';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

// Async Thunks
export const registerUser = createAsyncThunk('auth/register', async (data: any, { rejectWithValue }) => {
    try {
        const response = await apiPost(AUTH_ENDPOINTS.REGISTER, data);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || ERROR_MESSAGES.AUTH.REGISTRATION_FAILED);
    }
});

export const loginUser = createAsyncThunk('auth/login', async (phoneNumber: string, { rejectWithValue }) => {
    try {
        const response = await apiPost(AUTH_ENDPOINTS.LOGIN, { phoneNumber });
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || ERROR_MESSAGES.AUTH.LOGIN_FAILED);
    }
});

export const verifyOtp = createAsyncThunk('auth/verifyOtp', async (data: { phoneNumber: string; otp: string }, { rejectWithValue }) => {
    try {
        const response = await apiPost(AUTH_ENDPOINTS.VERIFY_OTP, data);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || ERROR_MESSAGES.AUTH.VERIFICATION_FAILED);
    }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const response = await apiPost(AUTH_ENDPOINTS.LOGOUT);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(ERROR_MESSAGES.AUTH.LOGOUT_FAILED);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        forceLogout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        // Register
        builder.addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(registerUser.fulfilled, (state) => { state.loading = false; })
            .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

        // Login
        builder.addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(loginUser.fulfilled, (state) => { state.loading = false; })
            .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

        // Verify OTP
        builder.addCase(verifyOtp.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.token) {
                    state.token = action.payload.token;
                    state.isAuthenticated = true;
                }
            })
            .addCase(verifyOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

        // Logout
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.token = null;
            state.isAuthenticated = false;
        });
    },
});

export const { clearError, forceLogout } = authSlice.actions;
export default authSlice.reducer;

