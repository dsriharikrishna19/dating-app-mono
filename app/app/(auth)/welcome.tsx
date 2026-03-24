import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Heart, Smartphone, Apple, Globe } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Abstract Background Gradient Decor */}
      <View className="absolute inset-0 overflow-hidden pointer-events-none">
        <View 
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[40%] rounded-full bg-primary/20 blur-[120px]" 
          style={{ shadowColor: '#FF4458', shadowOpacity: 0.2, shadowRadius: 120 }}
        />
        <View 
          className="absolute top-[20%] -right-[20%] w-[70%] h-[50%] rounded-full bg-purple-600/10 blur-[120px]"
          style={{ shadowColor: '#A855F7', shadowOpacity: 0.1, shadowRadius: 120 }}
        />
      </View>

      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        className="px-6 pt-12 pb-10"
      >
        <SafeAreaView className="flex-1">
          {/* Hero Image Section */}
          <View className="w-full mb-10">
            <View className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDONL268h7sGiMFa1oWozc2n0SZ15WnqY8X7NdglKZKahXAgyCLHJA4memYxvyh-KNip4FFBZdsEQ5sP8mEF8WHfE92WPJsbiltYJNvqpI-cfJuLojhmnPlhxsmbtx-2xbmmxAEGe5h5N8QH-sjQU0yqNLl-ISrBKUHhCCNO8awI8dkQeTgzYvXWyR6xZIuWTFPLNTJBnx7hFW8f-nGzUDCws3mBnDn_905_EB8hssivVY9BlyxDAzkQX9Z8HybAI81fpwFydTMv_M' }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(15, 23, 42, 0.8)']}
                className="absolute inset-0"
              />
              
              {/* Floating Glass Badge */}
              <View className="absolute bottom-6 left-6 right-6 overflow-hidden rounded-2xl">
                <BlurView intensity={30} tint="light" className="p-4 border border-white/20">
                  <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 rounded-full bg-primary items-center justify-center">
                      <Heart size={20} stroke="white" fill="white" />
                    </View>
                    <View>
                      <Text className="text-[14px] font-display-medium text-white/90">2,400+ Active now</Text>
                      <Text className="text-[12px] font-display text-white/60">Find your person today</Text>
                    </View>
                  </View>
                </BlurView>
              </View>
            </View>
          </View>

          {/* Branding */}
          <View className="items-center mb-10">
            <View className="flex-row items-center gap-2 mb-3">
              <Heart size={36} stroke="#FF4458" fill="#FF4458" />
              <Text className="text-slate-900 dark:text-white text-[32px] font-display-bold tracking-tight">HeartBeat</Text>
            </View>
            <Text className="text-slate-700 dark:text-slate-300 text-[18px] font-display-medium text-center max-w-[280px]">
              Connections that matter. Stories that last.
            </Text>
          </View>

          {/* CTA Actions */}
          <View className="w-full space-y-4 mt-auto">
            <TouchableOpacity 
              activeOpacity={0.9}
              className="w-full h-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20"
            >
              <Text className="text-white text-[16px] font-display-bold tracking-wide">Create Account</Text>
            </TouchableOpacity>

            <View className="flex-row items-center py-2">
              <View className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
              <Text className="px-4 text-[14px] font-display-medium text-slate-400">or connect with</Text>
              <View className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
            </View>

            <View className="flex-row gap-3">
              <TouchableOpacity 
                activeOpacity={0.7}
                className="flex-1 h-12 flex-row items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50"
              >
                <Globe size={20} stroke="#4285F4" />
                <Text className="ml-2 text-[14px] font-display-semibold text-slate-900 dark:text-white">Google</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                activeOpacity={0.7}
                className="flex-1 h-12 flex-row items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50"
              >
                <Apple size={20} stroke={Dimensions.get('window').width > 0 ? '#000' : '#FFF'} />
                <Text className="ml-2 text-[14px] font-display-semibold text-slate-900 dark:text-white">Apple</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => router.push('/(auth)/phone-entry')}
              className="w-full flex-row items-center justify-center gap-2 py-3"
            >
              <Smartphone size={20} stroke="#64748b" />
              <Text className="text-[14px] font-display-medium text-slate-500 dark:text-slate-400">Use Phone Number</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Text */}
          <View className="mt-8 items-center px-4">
            <Text className="text-[12px] text-slate-400 text-center leading-relaxed font-display">
              By continuing, you agree to our{' '}
              <Text className="text-primary font-display-semibold underline">Terms of Service</Text>
              {' '}and{' '}
              <Text className="text-primary font-display-semibold underline">Privacy Policy</Text>
            </Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
