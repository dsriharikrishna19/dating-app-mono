import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '@/services/authService'
import { LoginFormData } from '@/schemas/authSchema'

interface AuthState {
  user: {
    id: string
    name: string
    email: string
    role: 'admin' | 'user'
  } | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data: LoginFormData, { rejectWithValue }) => {
    try {
      const response = await authService.login(data)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed')
    }
  }
)

// Initial state from localStorage if available
const getInitialState = (): AuthState => {
  if (typeof window === 'undefined') {
    return { user: null, isAuthenticated: false, isLoading: false, error: null }
  }
  
  const saved = localStorage.getItem('auth_state')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      return { ...parsed, isLoading: false, error: null }
    } catch (e) {
      return { user: null, isAuthenticated: false, isLoading: false, error: null }
    }
  }
  
  return { user: null, isAuthenticated: false, isLoading: false, error: null }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: AuthState['user'] }>
    ) => {
      state.user = action.payload.user
      state.isAuthenticated = true
      localStorage.setItem('auth_state', JSON.stringify({ user: state.user, isAuthenticated: true }))
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem('auth_state')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        localStorage.setItem('auth_state', JSON.stringify({ user: state.user, isAuthenticated: true }))
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
