import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import discoveryReducer from './slices/discoverySlice';
import chatReducer from './slices/chatSlice';
import settingsReducer from './slices/settingsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  discovery: discoveryReducer,
  chat: chatReducer,
  settings: settingsReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'user', 'settings'], // Persist these slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
