import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, MessageSquarePlus } from 'lucide-react-native';

const MATCHES = [
  { id: 1, name: 'Elena', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAg6zTN_cEHLgi1aXPymiTLEdUP5RvVqxKMg-SZ1tqxflR8i70mvhCsf4HwKjQVXH_12xsesP-XL0Z8MR34qFVWXD48bh4M96Hm-TUwBcnZadyHm-iGJ6O0_u-L4nzjE-wwKO095tuV8kXZJtpQ7dFHq7gHfpnKBMLrZE-_RyE2hGbq6DSnJyp3TG7mSIoj1bn3Pvc0FZYMAgUPYx7qtKCUv7Rk_9QRruEG6QswPPa2_V64_NdO2Si2XdgpKeKhFj8Kg8k3OaaCQ' },
  { id: 2, name: 'Sophia', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp5FsmI7jbP62GC8yB1fP640jGcxcTT7eHwcEHqDjplR6-9mVhYB_pepGfOnVGAFKKUZsC_cOLrWvwjzEz9ggpqiuS4ACYayOC5TqpHtZe-gyws1l4Ek-seZf97RHt1nq8N4_B6dfS1eY8HnzD-6QRm6HiAovKScysFgkh5_0SIsgxwHUEyWEyNJ70flg7fMALN9ht7bqVFzeK6yen_kmCnjRxyYVfRmVMHwZ0Jy-aBYcvxTvR6WPCVmp6Yz_1AKDagnuf1eQd9sc' },
  { id: 3, name: 'Chloe', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpthbiXRIkyF3nsfPmoHOqTw-oGkk0n6FuWR2J2rAVOdiXkcMDdAbdsKrDKgIS0zT-b2HZDIgUBEclP14ovG-idvu4SOOEASNwfXqChZfyPkHJsvTg30cU4MNeV6YCqYv403C8bOECCeXxN-tWeDmUmv8lSO-ulSdRP0aeqQW7ZHT4y28ooKkRJg0GNOGQhRr0Q8ASf7OFVEXqhIMehvvit-SyOqwuQsBbT_sr-GHK3wtrF50AriatD5-FrhW92QjrbAPh1InES98' },
  { id: 4, name: 'Maya', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI9JFkAN8UHe4RA-1CGmpA5tJNrrDRY2XL5yiKjsls_i9oszUigpaT7rtoNmfCsSeaTO3aX6tNhvXM7X_EeUzZgpyppD7EbmhQTqNv_A37uMQgDq92Jnyz-wvG94PLCgiY6AB1Ge9VSY9zj49E1SX_sRFq8hTO9r1EEf9l3qwgXqiX6RCWiGelkQIxhmxkyp7ewJ1NEBUgrRjDndP8UBGRcJcOGVmlvmNJVcT3UfH5rVNKzBZD6429Nt_7CwKZknIjvZ8EPbdlRCM' },
];

const CHATS = [
  { id: 1, name: 'Elena', message: 'That sounds like a great idea! Let\'s do it... 🎷', time: '2m ago', unread: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAg6zTN_cEHLkgi1aXPymiTLEdUP5RvVqxKMg-SZ1tqxflR8i70mvhCsf4HwKjQVXH_12xsesP-XL0Z8MR34qFVWXD48bh4M96Hm-TUwBcnZadyHm-iGJ6O0_u-L4nzjE-wwKO095tuV8kXZJtpQ7dFHq7gHfpnKBMLrZE-_RyE2hGbq6DSnJyp3TG7mSIoj1bn3Pvc0FZYMAgUPYx7qtKCUv7Rk_9QRruEG6QswPPa2_V64_NdO2Si2XdgpKeKhFj8Kg8k3OaaCQ' },
  { id: 2, name: 'Chloe', message: 'Hahaha you\'re so funny! 😂', time: '1h ago', unread: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpthbiXRIkyF3nsfPmoHOqTw-oGkk0n6FuWR2J2rAVOdiXkcMDdAbdsKrDKgIS0zT-b2HZDIgUBEclP14ovG-idvu4SOOEASNwfXqChZfyPkHJsvTg30cU4MNeV6YCqYv403C8bOECCeXxN-tWeDmUmv8lSO-ulSdRP0aeqQW7ZHT4y28ooKkRJg0GNOGQhRr0Q8ASf7OFVEXqhIMehvvit-SyOqwuQsBbT_sr-GHK3wtrF50AriatD5-FrhW92QjrbAPh1InES98' },
  { id: 3, name: 'Sophia', message: 'See you there! 👋', time: '3h ago', unread: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp5FsmI7jbP62GC8yB1fP640jGcxcTT7eHwcEHqDjplR6-9mVhYB_pepGfOnVGAFKKUZsC_cOLrWvwjzEz9ggpqiuS4ACYayOC5TqpHtZe-gyws1l4Ek-seZf97RHt1nq8N4_B6dfS1eY8HnzD-6QRm6HiAovKScysFgkh5_0SIsgxwHUEyWEyNJ70flg7fMALN9ht7bqVFzeK6yen_kmCnjRxyYVfRmVMHwZ0Jy-aBYcvxTvR6WPCVmp6Yz_1AKDagnuf1eQd9sc' },
];

export default function ChatsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background-dark">
      <SafeAreaView className="flex-1">
        <View className="px-6 pt-6 pb-4 flex-row items-center justify-between">
          <Text className="text-3xl font-display-bold text-white">Messages</Text>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-slate-800 items-center justify-center">
            <MessageSquarePlus size={20} stroke="#94a3b8" />
          </TouchableOpacity>
        </View>

        <View className="px-6 mb-6">
          <View className="bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 h-12 flex-row items-center gap-3">
            <Search size={18} stroke="#64748b" />
            <TextInput
              className="flex-1 text-white font-display-medium placeholder:text-slate-500 text-sm"
              placeholder="Search messages..."
              placeholderTextColor="#64748b"
            />
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="mb-8">
            <View className="px-6 flex-row justify-between items-center mb-4">
              <Text className="text-xs font-display-bold text-slate-500 uppercase tracking-widest">New Matches</Text>
              <Text className="text-xs font-display-bold text-primary">View All</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6">
              {MATCHES.map((match) => (
                <TouchableOpacity key={match.id} className="mr-5 items-center gap-2">
                  <View className="size-16 rounded-full border-2 border-primary p-0.5 shadow-lg shadow-primary/20">
                    <Image source={{ uri: match.image }} className="w-full h-full rounded-full" />
                  </View>
                  <Text className="text-xs text-slate-200 font-display-medium">{match.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View className="px-6 pb-10">
            <Text className="text-xs font-display-bold text-slate-500 uppercase tracking-widest mb-6">Conversations</Text>
            <View className="gap-6">
              {CHATS.map((chat) => (
                <TouchableOpacity 
                  key={chat.id} 
                  className="flex-row items-center gap-4"
                  onPress={() => router.push({ pathname: '/chat/[id]', params: { id: chat.id, name: chat.name } })}
                >
                  <View className="relative">
                    <Image source={{ uri: chat.image }} className="size-16 rounded-full" />
                    <View className="absolute bottom-0 right-0 size-4 bg-green-500 border-2 border-background-dark rounded-full" />
                  </View>
                  
                  <View className="flex-1 border-b border-slate-800/50 pb-4">
                    <View className="flex-row justify-between items-center mb-1">
                      <Text className="text-white font-display-bold text-lg">{chat.name}</Text>
                      <Text className="text-slate-500 text-xs font-display">{chat.time}</Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <Text 
                        className={`font-display text-sm flex-1 mr-2 ${chat.unread ? 'text-slate-100 font-display-bold' : 'text-slate-400'}`}
                        numberOfLines={1}
                      >
                        {chat.message}
                      </Text>
                      {chat.unread && (
                        <View className="size-2 bg-primary rounded-full" />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
