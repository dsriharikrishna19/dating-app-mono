import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { authService } from '../../services/auth.service';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials, setLoading, setError } from '../../store/slices/authSlice';

import { userService } from '../../services/user.service';
import { setProfile } from '../../store/slices/userSlice';

export default function VerifyCodeScreen() {
  const router = useRouter();
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
  const dispatch = useAppDispatch();
  const [code, setCode] = React.useState('');
  const [isVerifying, setIsVerifying] = React.useState(false);

  const handleVerify = async () => {
    if (code.length !== 6) return;

    setIsVerifying(true);
    try {
      const response = await authService.verifyOtp(phoneNumber as string, code);
      const { user, token } = response.data;
      
      dispatch(setCredentials({ user, token }));
      
      if (!user.onboarded) {
        router.push('/onboarding/step1');
      } else {
        // Fetch full profile for returning users
        try {
          const profileResponse = await userService.getProfile();
          dispatch(setProfile(profileResponse.data.profile));
        } catch (profileErr) {
          console.error('Profile fetch error:', profileErr);
        }
        router.replace('/');
      }
    } catch (err: any) {
      console.error('Verification Error:', err);
      // Fallback for demo: assume verified
      if (__DEV__) {
        dispatch(setCredentials({ 
          user: { id: 'demo-123', phoneNumber: phoneNumber as string, onboarded: true }, 
          token: 'demo-token' 
        }));
        router.replace('/');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    try {
      await authService.resendOtp(phoneNumber as string);
      alert('OTP Resent successfully!');
    } catch (err) {
      console.error('Resend Error:', err);
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-background-dark p-4 flex flex-col justify-center items-center"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Stack.Screen options={{
        headerTitle: '',
        headerTransparent: true,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} className="ml-2 p-2">
            <ArrowLeft size={24} stroke="white" />
          </TouchableOpacity>
        )
      }} />

      <SafeAreaView className="flex-1 px-8 pt-20">
        <View className="mb-12">
          <Text className="text-white text-4xl font-display-bold mb-4">Enter your code</Text>
          <Text className="text-slate-400 text-lg font-display">Wait, did you get it? Code sent to {phoneNumber}</Text>
        </View>

        <View className="mb-10 h-16 w-full px-4">
          <TextInput
            placeholder="000000"
            placeholderTextColor="#334155"
            maxLength={6}
            keyboardType="number-pad"
            className="w-full h-full bg-slate-800/50 border border-slate-700/50 rounded-2xl text-center text-white text-3xl font-display-extrabold tracking-[20px]"
            value={code}
            onChangeText={(val) => {
              setCode(val);
              if (val.length === 6) {
                // Potential auto-submit here
              }
            }}
            autoFocus
          />
        </View>

        <TouchableOpacity 
          className={`w-full h-14 items-center justify-center rounded-2xl shadow-lg ${code.length === 6 && !isVerifying ? 'bg-primary shadow-primary/20' : 'bg-slate-800 opacity-50'}`}
          disabled={code.length !== 6 || isVerifying}
          onPress={handleVerify}
        >
          <Text className="text-white text-lg font-display-bold">
            {isVerifying ? 'Verifying...' : 'Verify & Continue'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="mt-8 items-center border border-red-100 p-2 rounded-full"
          onPress={handleResend}
        >
          <Text className="text-primary font-display-bold text-base ">Resend Code</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
