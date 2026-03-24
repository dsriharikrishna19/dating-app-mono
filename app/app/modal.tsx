import { StatusBar } from 'expo-status-bar';
import { Platform, Text, View } from 'react-native';

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center p-6 bg-background-dark">
      <Text className="text-2xl font-display-bold text-white mb-4">About Friendly Buddy</Text>
      <View className="h-[1px] w-full bg-slate-800 mb-6" />
      <Text className="text-slate-400 font-display text-center leading-relaxed">
        Friendly Buddy is a premium platform designed to help you find meaningful connections through shared interests and high-gloss discovery experiences.
      </Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
