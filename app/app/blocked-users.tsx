import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, UserX, Shield } from 'lucide-react-native';
import { safetyService } from '../services/safety.service';

export default function BlockedUsersScreen() {
  const router = useRouter();
  const [blockedUsers, setBlockedUsers] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchBlocked = async () => {
    try {
      const res = await safetyService.getBlockedUsers();
      setBlockedUsers(res.data.blockedUsers);
    } catch (err) {
      console.error('Fetch Blocked Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchBlocked();
  }, []);

  const handleUnblock = (userId: string, name: string) => {
    Alert.alert(
      'Unblock User?',
      `Are you sure you want to unblock ${name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Unblock', 
          onPress: async () => {
            try {
              await safetyService.unblockUser(userId);
              fetchBlocked();
            } catch (err) {
              console.error('Unblock Error:', err);
            }
          }
        }
      ]
    );
  };

  return (
    <View className="flex-1 bg-background-dark">
      <Stack.Screen options={{ 
        headerShown: true, 
        headerTitle: 'Blocked Users',
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
          <View className="flex-row items-center gap-3 mb-8 bg-slate-800/10 p-4 rounded-2xl border border-white/5">
            <Shield size={24} stroke="#10b981" />
            <Text className="text-slate-400 font-display text-xs flex-1">
              Blocking a user will prevent them from seeing your profile and messaging you.
            </Text>
          </View>

          {blockedUsers.length === 0 && !isLoading ? (
            <View className="items-center justify-center py-20">
              <UserX size={48} stroke="#334155" />
              <Text className="text-slate-500 font-display-bold mt-4">No blocked users</Text>
            </View>
          ) : (
            <View className="gap-4">
              {blockedUsers.map((user) => (
                <View key={user.id} className="flex-row items-center justify-between p-4 bg-slate-800/20 rounded-3xl border border-white/5">
                  <View className="flex-row items-center gap-4">
                    <Image 
                      source={{ uri: user.image || 'https://i.pravatar.cc/150' }} 
                      className="size-12 rounded-full" 
                    />
                    <Text className="text-white font-display-bold text-lg">{user.name}</Text>
                  </View>
                  <TouchableOpacity 
                    onPress={() => handleUnblock(user.id, user.name)}
                    className="px-4 py-2 bg-slate-800 rounded-xl"
                  >
                    <Text className="text-primary font-display-bold text-xs uppercase">Unblock</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
