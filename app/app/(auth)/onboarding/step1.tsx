import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, User, Calendar, Users } from 'lucide-react-native';

export default function OnboardingStep1() {
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
            <View className="h-1 flex-1 bg-primary rounded-full transition-all duration-300" />
            <View className="h-1 flex-1 bg-slate-800 rounded-full" />
            <View className="h-1 flex-1 bg-slate-800 rounded-full" />
            <View className="h-1 flex-1 bg-slate-800 rounded-full" />
          </View>
          <Text className="text-white text-4xl font-display-bold mb-4">The Basics</Text>
          <Text className="text-slate-400 text-lg font-display">Tell us a bit about yourself</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="gap-8">
          <View className="gap-6">
            <View className="gap-2">
              <Text className="text-slate-500 font-display-bold uppercase tracking-widest text-[10px]">What's your name?</Text>
              <View className="flex-row items-center bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-4 gap-3">
                <User size={20} stroke="#64748b" />
                <TextInput
                  placeholder="First Name"
                  placeholderTextColor="#64748b"
                  className="flex-1 text-white font-display-bold text-lg"
                />
              </View>
            </View>

            <View className="gap-2">
              <Text className="text-slate-500 font-display-bold uppercase tracking-widest text-[10px]">When is your birthday?</Text>
              <View className="flex-row items-center bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-4 gap-3">
                <Calendar size={20} stroke="#64748b" />
                <TextInput
                  placeholder="MM / DD / YYYY"
                  placeholderTextColor="#64748b"
                  className="flex-1 text-white font-display-bold text-lg"
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <View className="gap-2">
              <Text className="text-slate-500 font-display-bold uppercase tracking-widest text-[10px]">I am a...</Text>
              <View className="flex-row gap-3">
                {['Man', 'Woman', 'Other'].map((option) => (
                  <TouchableOpacity 
                    key={option}
                    className={`flex-1 py-4 rounded-2xl border items-center justify-center ${option === 'Woman' ? 'bg-primary border-primary' : 'bg-slate-800/50 border-slate-700/50'}`}
                  >
                    <Text className={`font-display-bold ${option === 'Woman' ? 'text-white' : 'text-slate-400'}`}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <TouchableOpacity 
            className="w-full h-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 mt-10"
            onPress={() => router.push('/(auth)/onboarding/step2')}
          >
            <Text className="text-white text-lg font-display-bold">Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
