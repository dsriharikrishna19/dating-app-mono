import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, ChevronDown } from 'lucide-react-native';

export default function PhoneEntryScreen() {
  const router = useRouter();
  const [phone, setPhone] = React.useState('');

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
          <Text className="text-white text-4xl font-display-bold mb-4">My phone is</Text>
          <Text className="text-slate-400 text-lg font-display">We'll send a code to verify your account</Text>
        </View>

        <View className="flex-row gap-3 mb-10">
          <TouchableOpacity className="flex-row items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-4">
            <Text className="text-white font-display-bold">US +1</Text>
            <ChevronDown size={16} stroke="#64748b" />
          </TouchableOpacity>
          
          <View className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-4">
            <TextInput
              keyboardType="phone-pad"
              placeholder="000 000 0000"
              placeholderTextColor="#64748b"
              className="text-white font-display-bold text-lg"
              value={phone}
              onChangeText={setPhone}
              autoFocus
            />
          </View>
        </View>

        <TouchableOpacity 
          className={`w-full h-14 items-center justify-center rounded-2xl shadow-lg ${phone.length > 8 ? 'bg-primary shadow-primary/20' : 'bg-slate-800 opacity-50'}`}
          disabled={phone.length <= 8}
          onPress={() => router.push('/(auth)/verify-code')}
        >
          <Text className="text-white text-lg font-display-bold">Continue</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
