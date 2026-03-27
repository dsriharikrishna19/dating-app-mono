import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slicers/authSlice'
import userReducer from './slicers/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
