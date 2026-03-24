import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function VerifyCodeScreen() {
  const router = useRouter();
  const [code, setCode] = React.useState('');

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-background-dark"
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
          <Text className="text-slate-400 text-lg font-display">Wait, did you get it? Code sent to +1 555-0123</Text>
        </View>

        <View className="flex-row justify-between mb-10 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <View key={i} className="flex-1 aspect-square bg-slate-800/50 border border-slate-700/50 rounded-2xl items-center justify-center">
              <TextInput
                maxLength={1}
                keyboardType="number-pad"
                className="text-white text-2xl font-display-extrabold text-center w-full"
                value={code[i-1]}
                onChangeText={(val) => {
                  if (val) setCode(prev => prev + val);
                }}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity 
          className={`w-full h-14 items-center justify-center rounded-2xl shadow-lg ${code.length === 6 ? 'bg-primary shadow-primary/20' : 'bg-slate-800 opacity-50'}`}
          disabled={code.length !== 6}
          onPress={() => router.push('/(auth)/onboarding/step1')}
        >
          <Text className="text-white text-lg font-display-bold">Verify & Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-8 items-center">
          <Text className="text-primary font-display-bold text-base">Resend Code</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
