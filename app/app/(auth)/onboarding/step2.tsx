import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, Search, Sparkles } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateProfile } from '../../../store/slices/userSlice';

const INTERESTS = [
  'Photography', 'Travel', 'Music', 'Cooking', 'Art', 'Fitness', 
  'Hiking', 'Gaming', 'Coffee', 'Yoga', 'Movies', 'Dancing'
];

export default function OnboardingStep2() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.user.profile);
  
  const [selected, setSelected] = React.useState<string[]>(
    profile?.interests?.map(i => i.name) || ['Photography', 'Travel']
  );

  const handleNext = () => {
    if (selected.length === 0) return;
    
    // Convert string array to Interest objects
    const interests = selected.map(name => ({ id: name, name }));
    dispatch(updateProfile({ interests }));
    router.push('/onboarding/step3');
  };

  const toggleInterest = (interest: string) => {
    let nextSelected = [];
    if (selected.includes(interest)) {
      nextSelected = selected.filter(i => i !== interest);
    } else if (selected.length < 5) {
      nextSelected = [...selected, interest];
    } else {
      return;
    }
    
    setSelected(nextSelected);
    const interests = nextSelected.map(name => ({ id: name, name }));
    dispatch(updateProfile({ interests }));
  };
  
  return (
    <View className="flex-1 bg-background-dark p-4">
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
            <View className="h-1 flex-1 bg-primary rounded-full transition-all duration-300" />
            <View className="h-1 flex-1 bg-slate-800 rounded-full" />
            <View className="h-1 flex-1 bg-slate-800 rounded-full" />
          </View>
          <View className="flex-row items-center gap-3 mb-4">
            <Text className="text-white text-4xl font-display-bold">My Vibes</Text>
            <Sparkles size={28} stroke="#FF4458" fill="#FF4458" />
          </View>
          <Text className="text-slate-400 text-lg font-display">Pick up to 5 things you love</Text>
        </View>

        <View className="bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-3 flex-row items-center mb-8 gap-3">
          <Search size={20} stroke="#64748b" />
          <TextInput 
            placeholder="Search interests"
            placeholderTextColor="#64748b"
            className="flex-1 text-white font-display-medium text-base"
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap gap-3">
            {INTERESTS.map((interest) => (
              <TouchableOpacity 
                key={interest}
                onPress={() => toggleInterest(interest)}
                className={`px-6 py-3.5 rounded-2xl border ${selected.includes(interest) ? 'bg-primary border-primary' : 'bg-slate-800/50 border-slate-700/50'}`}
              >
                <Text className={`font-display-bold ${selected.includes(interest) ? 'text-white' : 'text-slate-400'}`}>{interest}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            className={`w-full h-14 items-center justify-center rounded-2xl shadow-lg mt-12 mb-10 ${selected.length > 0 ? 'bg-primary shadow-primary/20' : 'bg-slate-800 opacity-50'}`}
            disabled={selected.length === 0}
            onPress={handleNext}
          >
            <Text className="text-white text-lg font-display-bold">Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
