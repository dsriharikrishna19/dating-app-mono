import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, ChevronDown, Check } from 'lucide-react-native';
import { authService } from '../../services/auth.service';
import { useAppDispatch } from '../../store/hooks';
import { setLoading, setError, setCredentials } from '../../store/slices/authSlice';

const COUNTRIES = [
  { code: '+1', name: 'United States', flag: '🇺🇸', id: 'US' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧', id: 'GB' },
  { code: '+1', name: 'Canada', flag: '🇨🇦', id: 'CA' },
  { code: '+61', name: 'Australia', flag: '🇦🇺', id: 'AU' },
  { code: '+91', name: 'India', flag: '🇮🇳', id: 'IN' },
  { code: '+49', name: 'Germany', flag: '🇩🇪', id: 'DE' },
  { code: '+33', name: 'France', flag: '🇫🇷', id: 'FR' },
  { code: '+81', name: 'Japan', flag: '🇯🇵', id: 'JP' },
  { code: '+82', name: 'South Korea', flag: '🇰🇷', id: 'KR' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷', id: 'BR' },
];

export default function PhoneEntryScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [phone, setPhone] = React.useState('');
  const [selectedCountry, setSelectedCountry] = React.useState(COUNTRIES[0]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleContinue = async () => {
    if (phone.length <= 8) return;
    
    setIsSubmitting(true);
    dispatch(setError(null));
    const fullPhone = `${selectedCountry.code}${phone}`;
    
    try {
      const response = await authService.authenticate(fullPhone);
      const data = response.data;

      if (data.requiresVerification) {
        router.push({
          pathname: '/verify-code',
          params: { phoneNumber: fullPhone }
        });
      } else {
        // Direct login if already verified (unlikely for phone auth but possible)
        const { user, token } = data;
        dispatch(setCredentials({ user, token }));
      }
    } catch (err: any) {
      console.error('Authentication Error:', err);
      dispatch(setError(err.response?.data?.message || 'Authentication failed. Please try again.'));
      
      // Fallback for demo if backend is offline
      if (__DEV__) {
        router.push({
          pathname: '/verify-code',
          params: { phoneNumber: fullPhone }
        });
      }
    } finally {
      setIsSubmitting(false);
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
          <Text className="text-white text-4xl font-display-bold mb-4">My phone is</Text>
          <Text className="text-slate-400 text-lg font-display">We'll send a code to verify your account</Text>
        </View>

        <View className="flex-row gap-3 mb-10 z-50">
          <View className="relative z-50">
            <TouchableOpacity 
              onPress={() => setIsModalVisible(!isModalVisible)}
              className="flex-row items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-4"
            >
              <Text className="text-white font-display-bold">{selectedCountry.id} {selectedCountry.code}</Text>
              <ChevronDown size={16} stroke="#64748b" />
            </TouchableOpacity>

            {isModalVisible && (
              <View 
                className="absolute top-full left-0 mt-2 bg-slate-900 border border-slate-700 rounded-2xl w-64 shadow-2xl overflow-hidden z-[100]"
                style={{
                  elevation: 5,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                }}
              >
                <FlatList
                  data={COUNTRIES}
                  keyExtractor={(item) => `${item.id}-${item.code}`}
                  showsVerticalScrollIndicator={false}
                  className="max-h-60"
                  renderItem={({ item }) => (
                    <TouchableOpacity 
                      className={`flex-row items-center justify-between py-3 px-4 ${selectedCountry.id === item.id ? 'bg-slate-800' : ''}`}
                      onPress={() => {
                        setSelectedCountry(item);
                        setIsModalVisible(false);
                      }}
                    >
                      <View className="flex-row items-center gap-3">
                        <Text className="text-xl">{item.flag}</Text>
                        <View>
                          <Text className="text-white font-display-bold text-sm">{item.name}</Text>
                          <Text className="text-slate-500 text-xs">{item.code}</Text>
                        </View>
                      </View>
                      {selectedCountry.id === item.id && (
                        <Check size={18} color="#ec4899" />
                      )}
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
          
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
          className={`w-full h-14 items-center justify-center rounded-2xl shadow-lg ${phone.length > 8 && !isSubmitting ? 'bg-primary shadow-primary/20' : 'bg-slate-800 opacity-50'}`}
          disabled={phone.length <= 8 || isSubmitting}
          onPress={handleContinue}
        >
          <Text className="text-white text-lg font-display-bold">
            {isSubmitting ? 'Sending...' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
