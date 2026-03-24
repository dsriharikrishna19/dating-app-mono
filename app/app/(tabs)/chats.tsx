import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, MessageSquarePlus } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setMatches, setConversations } from '../../store/slices/chatSlice';
import { chatService } from '../../services/chat.service';

export default function ChatsScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { matches, conversations, isLoading } = useAppSelector((state) => state.chat);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [matchesRes, convRes] = await Promise.all([
          chatService.getMatches(),
          chatService.getConversations()
        ]);
        dispatch(setMatches(matchesRes.data));
        dispatch(setConversations(convRes.data));
      } catch (err) {
        console.error('Fetch Chats Error:', err);
        // Fallback for demo is already in the hardcoded lists if we wanted, 
        // but let's just use the real state which might be empty
      }
    };

    fetchData();
  }, []);

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
              {matches.map((match) => (
                <TouchableOpacity 
                  key={match.id} 
                  className="mr-5 items-center gap-2"
                  onPress={() => router.push({ pathname: '/chat/[id]', params: { id: match.id, name: match.user.name } })}
                >
                  <View className="size-16 rounded-full border-2 border-primary p-0.5 shadow-lg shadow-primary/20">
                    <Image source={{ uri: match.user.images[0]?.url }} className="w-full h-full rounded-full" />
                  </View>
                  <Text className="text-xs text-slate-200 font-display-medium">{match.user.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View className="px-6 pb-10">
            <Text className="text-xs font-display-bold text-slate-500 uppercase tracking-widest mb-6">Conversations</Text>
            <View className="gap-6">
              {conversations.map((chat) => (
                <TouchableOpacity 
                  key={chat.matchId} 
                  className="flex-row items-center gap-4"
                  onPress={() => router.push({ pathname: '/chat/[id]', params: { id: chat.matchId, name: chat.otherUser.name } })}
                >
                  <View className="relative">
                    <Image source={{ uri: chat.otherUser.images[0]?.url }} className="size-16 rounded-full" />
                    <View className="absolute bottom-0 right-0 size-4 bg-green-500 border-2 border-background-dark rounded-full" />
                  </View>
                  
                  <View className="flex-1 border-b border-slate-800/50 pb-4">
                    <View className="flex-row justify-between items-center mb-1">
                      <Text className="text-white font-display-bold text-lg">{chat.otherUser.name}</Text>
                      <Text className="text-slate-500 text-xs font-display">{chat.lastMessage?.createdAt ? new Date(chat.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <Text 
                        className={`font-display text-sm flex-1 mr-2 ${chat.unreadCount > 0 ? 'text-slate-100 font-display-bold' : 'text-slate-400'}`}
                        numberOfLines={1}
                      >
                        {chat.lastMessage?.text || 'No messages yet'}
                      </Text>
                      {chat.unreadCount > 0 && (
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
