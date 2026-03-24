import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, Bell, MapPin, ShieldCheck } from 'lucide-react-native';

export default function OnboardingStep4() {
  const router = useRouter();
  
  return (
    <View className="flex-1 bg-background-dark">
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
          <View className="flex-row gap-2 mb-4">
            <View className="h-1 flex-1 bg-primary rounded-full" />
            <View className="h-1 flex-1 bg-primary rounded-full" />
            <View className="h-1 flex-1 bg-primary rounded-full" />
            <View className="h-1 flex-1 bg-primary rounded-full transition-all duration-300" />
          </View>
          <View className="flex-row items-center gap-3 mb-4">
            <Text className="text-white text-4xl font-display-bold">Final Setup</Text>
            <ShieldCheck size={28} stroke="#FF4458" />
          </View>
          <Text className="text-slate-400 text-lg font-display">Let's make sure everything runs smoothly</Text>
        </View>

        <View className="gap-6 mt-10">
          <View className="flex-row items-center gap-6 bg-slate-800/30 p-6 rounded-3xl border border-white/5">
            <View className="size-16 bg-blue-500/20 rounded-2xl items-center justify-center">
              <MapPin size={32} stroke="#3b82f6" fill="#3b82f6" />
            </View>
            <View className="flex-1">
              <Text className="text-white text-lg font-display-bold mb-1">Location Access</Text>
              <Text className="text-slate-500 text-sm font-display">To find people nearby</Text>
            </View>
            <TouchableOpacity className="bg-primary px-5 py-2.5 rounded-xl">
              <Text className="text-white font-display-bold text-xs">Allow</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center gap-6 bg-slate-800/30 p-6 rounded-3xl border border-white/5">
            <View className="size-16 bg-purple-500/20 rounded-2xl items-center justify-center">
              <Bell size={32} stroke="#a855f7" fill="#a855f7" />
            </View>
            <View className="flex-1">
              <Text className="text-white text-lg font-display-bold mb-1">Notifications</Text>
              <Text className="text-slate-500 text-sm font-display">Get told about matches</Text>
            </View>
            <TouchableOpacity className="bg-primary px-5 py-2.5 rounded-xl">
              <Text className="text-white font-display-bold text-xs">Allow</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          className="w-full h-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 mt-auto mb-10"
          onPress={() => router.push('/(auth)/onboarding/success')}
        >
          <Text className="text-white text-lg font-display-bold">All Set!</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
