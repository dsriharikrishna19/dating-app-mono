import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '@/types/user'
import { userService } from '@/services/userService'

interface UserState {
  users: User[]
  selectedUser: User | null
  loading: boolean
  error: string | null
  total: number
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  total: 0,
}

export const fetchUsersThunk = createAsyncThunk(
  'user/fetchAll',
  async ({ page, limit }: { page?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const response = await userService.fetchUsers(page, limit)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch users')
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    },
    selectUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload.data
        state.total = action.payload.total
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setUsers, selectUser, setLoading, setError } = userSlice.actions
export default userSlice.reducer
