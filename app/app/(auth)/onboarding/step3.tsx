import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, Plus, Camera, Trash2 } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const GRID_SIZE = (width - 64 - 16) / 3;

export default function OnboardingStep3() {
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
            <View className="h-1 flex-1 bg-primary rounded-full transition-all duration-300" />
            <View className="h-1 flex-1 bg-slate-800 rounded-full" />
          </View>
          <View className="flex-row items-center gap-3 mb-4">
            <Text className="text-white text-4xl font-display-bold">Add Photos</Text>
            <Camera size={28} stroke="#FF4458" />
          </View>
          <Text className="text-slate-400 text-lg font-display">Show the world the real you</Text>
        </View>

        <View className="flex-row flex-wrap gap-4">
          <View 
            style={{ width: GRID_SIZE * 2 + 16, height: GRID_SIZE * 2 + 16 }} 
            className="bg-slate-800/50 border-2 border-dashed border-primary/40 rounded-3xl items-center justify-center overflow-hidden"
          >
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDONL268h7sGiMFa1oWozc2n0SZ15WnqY8X7NdglKZKahXAgyCLHJA4memYxvyh-KNip4FFBZdsEQ5sP8mEF8WHfE92WPJsbiltYJNvqpI-cfJuLojhmnPlhxsmbtx-2xbmmxAEGe5h5N8QH-sjQU0yqNLl-ISrBKUHhCCNO8awI8dkQeTgzYvXWyR6xZIuWTFPLNTJBnx7hFW8f-nGzUDCws3mBnDn_905_EB8hssivVY9BlyxDAzkQX9Z8HybAI81fpwFydTMv_M' }}
              className="w-full h-full"
            />
            <TouchableOpacity className="absolute bottom-4 right-4 size-10 bg-primary rounded-full items-center justify-center shadow-lg">
              <Plus size={24} stroke="white" />
            </TouchableOpacity>
          </View>

          <View className="gap-4">
            {[1, 2].map((i) => (
              <View 
                key={i}
                style={{ width: GRID_SIZE, height: GRID_SIZE }}
                className="bg-slate-800/50 border-2 border-dashed border-slate-700/50 rounded-2xl items-center justify-center"
              >
                <Plus size={20} stroke="#64748b" />
              </View>
            ))}
          </View>

          {[3, 4, 5].map((i) => (
            <View 
              key={i}
              style={{ width: GRID_SIZE, height: GRID_SIZE }}
              className="bg-slate-800/50 border-2 border-dashed border-slate-700/50 rounded-2xl items-center justify-center"
            >
              <Plus size={20} stroke="#64748b" />
            </View>
          ))}
        </View>

        <TouchableOpacity 
          className="w-full h-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 mt-auto mb-10"
          onPress={() => router.push('/(auth)/onboarding/step4')}
        >
          <Text className="text-white text-lg font-display-bold">Next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
