import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import '../global.css';
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

import { 
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store, persistor } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useRouter, useSegments } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setHasCheckedAuth } from '../store/slices/authSlice';

import { useColorScheme } from '@/components/useColorScheme';
import { socketService } from '../services/socket.service';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'welcome',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootLayoutNav />
      </PersistGate>
    </Provider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, hasCheckedAuth, user } = useAppSelector((state) => state.auth);
  const segments = useSegments();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      socketService.connect(user.id);
    } else {
      socketService.disconnect();
    }
    
    return () => {
      socketService.disconnect();
    };
  }, [isAuthenticated, user]);

  useEffect(() => {
    // Check for tokens or existing session here if needed
    dispatch(setHasCheckedAuth(true));
  }, []);

  useEffect(() => {
    if (!hasCheckedAuth) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/welcome');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/');
    }
  }, [isAuthenticated, segments, hasCheckedAuth]);

  const { status, matchId: callChannel, otherUser: caller } = useAppSelector((state) => state.call);

  useEffect(() => {
    if (status === 'ringing' && callChannel) {
      // Incoming call - navigate to video call screen
      router.push({
        pathname: '/video-call',
        params: { 
          channelName: callChannel, 
          otherUserName: caller?.name || 'Partner' 
        }
      });
    }
  }, [status, callChannel, caller]);

  if (!hasCheckedAuth) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="user/[id]" options={{ presentation: 'card' }} />
        <Stack.Screen name="settings" options={{ presentation: 'card', headerShown: true, title: 'Settings' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
