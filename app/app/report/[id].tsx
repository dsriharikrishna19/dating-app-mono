import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, ShieldAlert, ChevronRight } from 'lucide-react-native';
import { safetyService } from '../../services/safety.service';

const REPORT_REASONS = [
  'Inappropriate Content',
  'Harassment or Bullying',
  'Spam or Fake Profile',
  'Underage User',
  'Solicitation',
  'Other'
];

export default function ReportScreen() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const [selectedReason, setSelectedReason] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    if (!selectedReason) {
      Alert.alert('Selection Required', 'Please select a reason for reporting.');
      return;
    }

    setIsSubmitting(true);
    try {
      await safetyService.reportUser(id as string, selectedReason, description);
      Alert.alert(
        'Report Submitted',
        'Thank you for helping keep Friendly Buddy safe. Our team will review this profile.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (err) {
      console.error('Report Error:', err);
      Alert.alert('Error', 'Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-background-dark">
      <Stack.Screen options={{ 
        headerShown: true, 
        headerTitle: `Report ${name}`,
        headerStyle: { backgroundColor: '#0F172A' },
        headerTintColor: '#fff',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} className="ml-2">
            <ArrowLeft size={24} stroke="#fff" />
          </TouchableOpacity>
        ),
      }} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6">
          <View className="flex-row items-center gap-3 mb-8 bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20">
            <ShieldAlert size={24} stroke="#f59e0b" />
            <Text className="text-amber-200/70 font-display text-xs flex-1">
              Your report is anonymous. We will investigate the profile and take appropriate action.
            </Text>
          </View>

          <Text className="text-white font-display-bold text-lg mb-4">Reason for reporting</Text>
          <View className="gap-2 mb-8">
            {REPORT_REASONS.map((reason) => (
              <TouchableOpacity 
                key={reason}
                onPress={() => setSelectedReason(reason)}
                className={`flex-row items-center justify-between p-4 rounded-2xl border ${selectedReason === reason ? 'bg-primary/20 border-primary' : 'bg-slate-800/20 border-white/5'}`}
              >
                <Text className={`font-display-medium ${selectedReason === reason ? 'text-white' : 'text-slate-400'}`}>{reason}</Text>
                {selectedReason === reason && <View className="size-2 bg-primary rounded-full" />}
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-white font-display-bold text-lg mb-4">Additional Details (Optional)</Text>
          <TextInput
            className="bg-slate-800/20 border border-white/5 rounded-2xl p-4 text-white font-display min-h-[120px]"
            placeholder="Tell us more about the issue..."
            placeholderTextColor="#64748b"
            multiline
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />

          <TouchableOpacity 
            onPress={handleSubmit}
            disabled={isSubmitting}
            className={`mt-10 p-5 rounded-3xl items-center justify-center ${isSubmitting ? 'bg-slate-700' : 'bg-primary'}`}
          >
            <Text className="text-white font-display-bold text-lg">
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
