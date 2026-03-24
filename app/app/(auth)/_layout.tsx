import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="phone-entry" />
      <Stack.Screen name="verify-code" />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
}
