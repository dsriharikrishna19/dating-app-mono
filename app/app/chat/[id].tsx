import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Phone, Video, Send, Plus, Smile } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ChatDetailScreen() {
  const router = useRouter();
  const { name, id } = useLocalSearchParams();
  const [message, setMessage] = React.useState('');

  const MESSAGES = [
    { id: 1, text: "Hey! I saw you're into jazz too. Ever been to Blue Note?", sender: 'them', time: '10:30 AM' },
    { id: 2, text: "The one in Greenwich Village? Yeah, I love that place!", sender: 'me', time: '10:32 AM' },
    { id: 3, text: "That sounds like a great idea! Let's do it... 🎷", sender: 'them', time: '10:35 AM' },
  ];

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-background-dark"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Stack.Screen options={{
        headerTitle: name as string || 'Chat',
        headerStyle: { backgroundColor: '#0F172A' },
        headerTintColor: '#fff',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} className="ml-2">
            <ArrowLeft size={24} stroke="#fff" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View className="flex-row items-center gap-4 mr-2">
            <TouchableOpacity><Phone size={20} stroke="#fff" /></TouchableOpacity>
            <TouchableOpacity><Video size={20} stroke="#fff" /></TouchableOpacity>
          </View>
        )
      }} />

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <View className="items-center my-8">
          <View className="size-24 rounded-full border-4 border-slate-800 p-1 mb-3">
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAg6zTN_cEHLkgi1aXPymiTLEdUP5RvVqxKMg-SZ1tqxflR8i70mvhCsf4HwKjQVXH_12xsesP-XL0Z8MR34qFVWXD48bh4M96Hm-TUwBcnZadyHm-iGJ6O0_u-L4nzjE-wwKO095tuV8kXZJtpQ7dFHq7gHfpnKBMLrZE-_RyE2hGbq6DSnJyp3TG7mSIoj1bn3Pvc0FZYMAgUPYx7qtKCUv7Rk_9QRruEG6QswPPa2_V64_NdO2Si2XdgpKeKhFj8Kg8k3OaaCQ' }} 
              className="w-full h-full rounded-full"
            />
          </View>
          <Text className="text-white font-display-bold text-xl">{name}</Text>
          <Text className="text-slate-500 font-display text-sm mt-1">Matched 2 days ago</Text>
        </View>

        {MESSAGES.map((msg) => (
          <View key={msg.id} className={`mb-6 flex-row ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <View className={`max-w-[80%] px-4 py-3 rounded-2xl ${msg.sender === 'me' ? 'bg-primary' : 'bg-slate-800'}`}>
              <Text className="text-white font-display text-base">{msg.text}</Text>
              <Text className={`text-[10px] mt-1 ${msg.sender === 'me' ? 'text-white/70' : 'text-slate-500'}`}>{msg.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <SafeAreaView>
        <View className="p-4 bg-slate-900 border-t border-slate-800 flex-row items-center gap-3">
          <TouchableOpacity className="size-10 rounded-full bg-slate-800 items-center justify-center">
            <Plus size={20} stroke="#94a3b8" />
          </TouchableOpacity>
          
          <View className="flex-1 bg-slate-800 rounded-2xl px-4 py-2 flex-row items-center">
            <TextInput
              className="flex-1 text-white font-display text-sm min-h-[40px]"
              placeholder="Type a message..."
              placeholderTextColor="#64748b"
              multiline
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity><Smile size={20} stroke="#94a3b8" /></TouchableOpacity>
          </View>

          <TouchableOpacity 
            className={`size-12 rounded-full items-center justify-center ${message.trim() ? 'bg-primary' : 'bg-slate-800'}`}
          >
            <Send size={20} stroke={message.trim() ? 'white' : '#64748b'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
