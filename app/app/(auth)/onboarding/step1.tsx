import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Modal, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, User, Calendar as CalendarIcon, ChevronDown } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateProfile } from '../../../store/slices/userSlice';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function OnboardingStep1() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.user.profile);

  const [name, setName] = React.useState(profile?.name || '');
  const [birthDate, setBirthDate] = React.useState(profile?.birthDate || '');
  const [gender, setGender] = React.useState(profile?.gender || 'Woman');
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  // Date selection state
  const initialDate = birthDate ? new Date(birthDate) : new Date(2000, 0, 1);
  const [tempDay, setTempDay] = React.useState(initialDate.getDate());
  const [tempMonth, setTempMonth] = React.useState(initialDate.getMonth());
  const [tempYear, setTempYear] = React.useState(initialDate.getFullYear());

  const YEARS = Array.from({ length: 83 }, (_, i) => new Date().getFullYear() - 18 - i);
  const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleNext = () => {
    if (!name || !birthDate) return;
    dispatch(updateProfile({ name, birthDate, gender }));
    router.push('/onboarding/step2');
  };

  const confirmDate = () => {
    // Basic date validation
    const lastDayOfMonth = new Date(tempYear, tempMonth + 1, 0).getDate();
    const validatedDay = Math.min(tempDay, lastDayOfMonth);
    const selectedDate = new Date(tempYear, tempMonth, validatedDay);
    setBirthDate(selectedDate.toISOString());
    setShowDatePicker(false);
  };

  const formatDate = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
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
            <View className="h-1 flex-1 bg-primary rounded-full transition-all duration-300" />
            <View className="h-1 flex-1 bg-slate-800 rounded-full" />
            <View className="h-1 flex-1 bg-slate-800 rounded-full" />
            <View className="h-1 flex-1 bg-slate-800 rounded-full" />
          </View>
          <Text className="text-white text-4xl font-display-bold mb-4">The Basics</Text>
          <Text className="text-slate-400 text-lg font-display">Tell us a bit about yourself</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="gap-8 pb-32">
            <View className="gap-6">
              <View className="gap-2">
                <Text className="text-slate-500 font-display-bold uppercase tracking-widest text-[10px]">What's your name?</Text>
                <View className="flex-row items-center bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-4 gap-3">
                  <User size={20} stroke="#64748b" />
                  <TextInput
                    placeholder="First Name"
                    placeholderTextColor="#64748b"
                    className="flex-1 text-white font-display-bold text-lg"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              <View className="gap-2">
                <Text className="text-slate-500 font-display-bold uppercase tracking-widest text-[10px]">When is your birthday?</Text>
                <TouchableOpacity 
                  onPress={() => setShowDatePicker(true)}
                  className="flex-row items-center bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-4 gap-3"
                >
                  <CalendarIcon size={20} stroke="#64748b" />
                  <Text className={`flex-1 font-display-bold text-lg ${birthDate ? 'text-white' : 'text-slate-500'}`}>
                    {birthDate ? formatDate(birthDate) : 'Select Date'}
                  </Text>
                  <ChevronDown size={20} stroke="#64748b" />
                </TouchableOpacity>
              </View>

              <View className="gap-2">
                <Text className="text-slate-500 font-display-bold uppercase tracking-widest text-[10px]">I am a...</Text>
                <View className="flex-row gap-3">
                  {['Man', 'Woman', 'Other'].map((option) => (
                    <TouchableOpacity 
                      key={option}
                      onPress={() => setGender(option)}
                      className={`flex-1 py-4 rounded-2xl border items-center justify-center ${gender === option ? 'bg-primary border-primary' : 'bg-slate-800/50 border-slate-700/50'}`}
                    >
                      <Text className={`font-display-bold ${gender === option ? 'text-white' : 'text-slate-400'}`}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            <TouchableOpacity 
              className={`w-full h-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 mt-10 ${(name && birthDate) ? 'opacity-100' : 'opacity-50'}`}
              onPress={handleNext}
              disabled={!name || !birthDate}
            >
              <Text className="text-white text-lg font-display-bold">Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View className="flex-1 justify-end bg-black/60">
          <View className="bg-slate-900 rounded-t-[40px] p-8 pb-12">
            <View className="flex-row justify-between items-center mb-8">
              <Text className="text-white text-2xl font-display-bold">Select Birthday</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Text className="text-primary font-display-bold">Cancel</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row gap-4 h-60">
              <View className="flex-1">
                <Text className="text-slate-500 text-[10px] uppercase mb-2 text-center">Month</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {MONTHS.map((m, i) => (
                    <TouchableOpacity 
                      key={m} 
                      onPress={() => setTempMonth(i)}
                      className={`py-3 items-center rounded-xl mb-1 ${tempMonth === i ? 'bg-primary/20' : ''}`}
                    >
                      <Text className={`font-display-bold ${tempMonth === i ? 'text-primary' : 'text-slate-400'}`}>{m.slice(0, 3)}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View className="w-16">
                <Text className="text-slate-500 text-[10px] uppercase mb-2 text-center">Day</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {DAYS.map((d) => (
                    <TouchableOpacity 
                      key={d} 
                      onPress={() => setTempDay(d)}
                      className={`py-3 items-center rounded-xl mb-1 ${tempDay === d ? 'bg-primary/20' : ''}`}
                    >
                      <Text className={`font-display-bold ${tempDay === d ? 'text-primary' : 'text-slate-400'}`}>{d}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View className="w-24">
                <Text className="text-slate-500 text-[10px] uppercase mb-2 text-center">Year</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {YEARS.map((y) => (
                    <TouchableOpacity 
                      key={y} 
                      onPress={() => setTempYear(y)}
                      className={`py-3 items-center rounded-xl mb-1 ${tempYear === y ? 'bg-primary/20' : ''}`}
                    >
                      <Text className={`font-display-bold ${tempYear === y ? 'text-primary' : 'text-slate-400'}`}>{y}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <TouchableOpacity 
              onPress={confirmDate}
              className="w-full h-14 bg-primary rounded-2xl items-center justify-center mt-8"
            >
              <Text className="text-white text-lg font-display-bold">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
