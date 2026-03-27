import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Heart, CheckCircle2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { userService } from '../../../services/user.service';
import { setCredentials } from '../../../store/slices/authSlice';

export default function OnboardingSuccessScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.user.profile);
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleStart = async () => {
    setIsSubmitting(true);
    try {
      // 1. Submit Onboarding Data to Backend
      // The backend expects images as string[] and interests as string[]
      if (!profile) throw new Error('Profile data missing');
      
      const submissionData = {
        ...profile,
        images: profile.images?.map((img: any) => img.url) || [],
        interests: profile.interests?.map((i: any) => i.name || i) || []
      };
      
      await userService.onboarding(submissionData);
      
      // 2. Update local Redux state
      if (user) {
        dispatch(setCredentials({ 
          user: { ...user, onboarded: true }, 
          token: token || ''
        }));
      }
      
      router.replace('/');
    } catch (err) {
      console.error('Final Submission Error:', err);
      // Fallback for demo
      if (__DEV__) {
        router.replace('/');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-background-dark p-4">
      <Stack.Screen options={{ headerShown: false }} />
      
      <LinearGradient
        colors={['rgba(255, 68, 88, 0.1)', 'transparent']}
        className="absolute inset-0"
      />

      <SafeAreaView className="flex-1 items-center justify-center px-10">
        <View className="size-32 bg-primary rounded-full items-center justify-center mb-8 shadow-2xl shadow-primary/40">
          <CheckCircle2 size={64} stroke="white" strokeWidth={3} />
        </View>
        
        <Text className="text-white text-5xl font-display-extrabold text-center mb-6">You're Ready!</Text>
        
        <Text className="text-slate-400 text-xl font-display text-center leading-relaxed">
          Your profile is live. We've found some great people you might like to meet.
        </Text>

        <View className="flex-row -space-x-6 my-12">
          {[1, 2, 3].map((i) => (
            <View key={i} className="size-20 rounded-full border-4 border-background-dark overflow-hidden bg-slate-800">
               <View className="flex-1 items-center justify-center">
                 <Heart size={30} stroke="#ff4255" fill="#ff4255" />
               </View>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          className={`w-full h-16 items-center justify-center rounded-3xl bg-primary shadow-2xl shadow-primary/30 ${isSubmitting ? 'opacity-50' : 'opacity-100'}`}
          onPress={handleStart}
          disabled={isSubmitting}
        >
          <Text className="text-white text-xl font-display-bold">
            {isSubmitting ? 'Finalizing...' : 'Start Exploring'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
