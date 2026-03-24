import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { X, Check, Star, Zap, Globe, Heart, ShieldCheck } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useAppDispatch } from '../store/hooks';
import { setGold } from '../store/slices/userSlice';

const { width } = Dimensions.get('window');

const PLANS = [
  { id: '1m', duration: '1 Month', price: '$19.99', perMonth: '$19.99/mo', popular: false },
  { id: '6m', duration: '6 Months', price: '$59.99', perMonth: '$9.99/mo', popular: true, discount: '50% OFF' },
  { id: '12m', duration: '12 Months', price: '$89.99', perMonth: '$7.49/mo', popular: false, discount: '62% OFF' },
];

const FEATURES = [
  { title: 'Unlimited Likes', description: 'Swipe as much as you want', icon: <Heart size={20} stroke="#EAB308" fill="#EAB308" /> },
  { title: 'See Who Likes You', description: 'Match instantly with admirers', icon: <Star size={20} stroke="#EAB308" fill="#EAB308" /> },
  { title: 'Global Passport', description: 'Match with people anywhere', icon: <Globe size={20} stroke="#EAB308" /> },
  { title: '5 Free Super Likes', description: 'Stand out from the crowd', icon: <Zap size={20} stroke="#EAB308" fill="#EAB308" /> },
  { title: 'Incognito Mode', description: 'Only be seen by people you like', icon: <ShieldCheck size={20} stroke="#EAB308" /> },
];

export default function PremiumScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selectedPlan, setSelectedPlan] = React.useState('6m');

  const handleContinue = () => {
    dispatch(setGold(true));
    router.back();
  };

  return (
    <View className="flex-1 bg-background-dark">
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Dynamic Background */}
      <View className="absolute inset-0">
        <LinearGradient
          colors={['#1E293B', '#0F172A']}
          className="absolute inset-0"
        />
        <View 
          className="absolute -top-[10%] -right-[20%] w-[80%] h-[50%] rounded-full bg-yellow-500/10 blur-[120px]"
        />
        <View 
          className="absolute top-[20%] -left-[20%] w-[70%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]"
        />
      </View>

      <SafeAreaView className="flex-1">
        <View className="px-6 pt-4 flex-row justify-end">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="size-10 rounded-full bg-slate-800/80 items-center justify-center border border-white/10"
          >
            <X size={20} stroke="white" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="items-center mt-4 mb-10">
            <View className="size-20 rounded-3xl bg-yellow-500 items-center justify-center mb-6 shadow-2xl shadow-yellow-500/40 transform -rotate-12">
              <Star size={40} stroke="white" fill="white" />
            </View>
            <Text className="text-white text-4xl font-display-extrabold text-center mb-2">HeartBeat Gold</Text>
            <Text className="text-slate-400 text-lg font-display-medium text-center">Unlock the best version of your social life</Text>
          </View>

          {/* Plan Selection */}
          <View className="gap-4 mb-12">
            {PLANS.map((plan) => (
              <TouchableOpacity 
                key={plan.id}
                onPress={() => setSelectedPlan(plan.id)}
                className={`relative p-5 rounded-3xl border-2 transition-all duration-300 ${
                  selectedPlan === plan.id ? 'bg-slate-800 border-yellow-500 shadow-xl' : 'bg-slate-800/40 border-slate-800'
                }`}
              >
                {plan.popular && (
                  <View className="absolute -top-3 right-6 bg-yellow-500 px-3 py-1 rounded-full items-center">
                    <Text className="text-[10px] font-display-bold text-slate-900">MOST POPULAR</Text>
                  </View>
                )}
                {plan.discount && (
                  <View className="absolute top-5 right-5">
                    <Text className="text-[10px] font-display-bold text-green-500">{plan.discount}</Text>
                  </View>
                )}
                
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className={`text-lg font-display-bold mb-1 ${selectedPlan === plan.id ? 'text-white' : 'text-slate-200'}`}>
                      {plan.duration}
                    </Text>
                    <Text className="text-slate-500 text-xs font-display">{plan.perMonth}</Text>
                  </View>
                  <View className="items-end">
                    <Text className={`text-2xl font-display-extrabold ${selectedPlan === plan.id ? 'text-yellow-500' : 'text-white'}`}>
                      {plan.price}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Features Checklist */}
          <View className="mb-12">
            <Text className="text-slate-500 font-display-bold uppercase tracking-widest text-xs mb-8">What's Included</Text>
            <View className="gap-6">
              {FEATURES.map((feature, i) => (
                <View key={i} className="flex-row items-center gap-5">
                  <View className="size-12 rounded-2xl bg-slate-800 items-center justify-center border border-white/5">
                    {feature.icon}
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-display-bold text-base mb-0.5">{feature.title}</Text>
                    <Text className="text-slate-500 font-display text-sm">{feature.description}</Text>
                  </View>
                  <Check size={20} stroke="#EAB308" />
                </View>
              ))}
            </View>
          </View>

          {/* Bottom Space */}
          <View className="h-10" />
        </ScrollView>
      </SafeAreaView>

      {/* Sticky CTA */}
      <View className="px-6 py-8 border-t border-white/5 bg-background-dark/80 backdrop-blur-xl">
        <TouchableOpacity 
          onPress={handleContinue}
          className="w-full h-16 bg-yellow-500 rounded-2xl items-center justify-center shadow-2xl shadow-yellow-500/30"
          activeOpacity={0.9}
        >
          <Text className="text-slate-900 font-display-bold text-lg">Continue to Gold</Text>
        </TouchableOpacity>
        <Text className="text-slate-500 text-[10px] text-center mt-4 font-display-medium">
          Monthly recurring subscription. Cancel anytime in settings.
        </Text>
      </View>
    </View>
  );
}
