import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, Bell, Lock, Eye, Sparkles, HelpCircle, Info, LogOut, ChevronRight, MapPin } from 'lucide-react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = React.useState(true);
  const [incognito, setIncognito] = React.useState(false);

  return (
    <View className="flex-1 bg-background-dark">
      <Stack.Screen options={{ 
        headerShown: true, 
        headerTitle: 'Settings',
        headerStyle: { backgroundColor: '#0F172A' },
        headerTintColor: '#fff',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} className="ml-2">
            <ArrowLeft size={24} stroke="#fff" />
          </TouchableOpacity>
        ),
      }} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6 gap-8">
          
          {/* Discovery Section */}
          <View>
            <Text className="text-xs font-display-bold text-slate-500 uppercase tracking-widest mb-4">Discovery Settings</Text>
            <View className="bg-slate-800/20 rounded-3xl border border-white/5 overflow-hidden">
              <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-white/5">
                <View className="flex-row items-center gap-3">
                  <MapPin size={20} stroke="#ff4255" />
                  <Text className="text-white font-display-semibold">Location</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Text className="text-slate-400 text-sm">New York, NY</Text>
                  <ChevronRight size={16} stroke="#64748b" />
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity className="flex-row items-center justify-between p-4">
                <View className="flex-row items-center gap-3">
                  <Sparkles size={20} stroke="#a855f7" />
                  <Text className="text-white font-display-semibold">Preferred Age</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Text className="text-slate-400 text-sm">22 - 30</Text>
                  <ChevronRight size={16} stroke="#64748b" />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Account Section */}
          <View>
            <Text className="text-xs font-display-bold text-slate-500 uppercase tracking-widest mb-4">Account</Text>
            <View className="bg-slate-800/20 rounded-3xl border border-white/5 overflow-hidden">
              <View className="flex-row items-center justify-between p-4 border-b border-white/5">
                <View className="flex-row items-center gap-3">
                  <Bell size={20} stroke="#3b82f6" />
                  <Text className="text-white font-display-semibold">Notifications</Text>
                </View>
                <Switch 
                  value={notifications} 
                  onValueChange={setNotifications}
                  trackColor={{ false: '#334155', true: '#ff4255' }}
                />
              </View>

              <View className="flex-row items-center justify-between p-4 border-b border-white/5">
                <View className="flex-row items-center gap-3">
                  <Eye size={20} stroke="#10b981" />
                  <Text className="text-white font-display-semibold">Incognito Mode</Text>
                </View>
                <Switch 
                  value={incognito} 
                  onValueChange={setIncognito}
                  trackColor={{ false: '#334155', true: '#ff4255' }}
                />
              </View>

              <TouchableOpacity className="flex-row items-center justify-between p-4">
                <View className="flex-row items-center gap-3">
                  <Lock size={20} stroke="#f59e0b" />
                  <Text className="text-white font-display-semibold">Privacy Policy</Text>
                </View>
                <ChevronRight size={16} stroke="#64748b" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Support Section */}
          <View>
            <Text className="text-xs font-display-bold text-slate-500 uppercase tracking-widest mb-4">Support</Text>
            <View className="bg-slate-800/20 rounded-3xl border border-white/5 overflow-hidden">
              <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-white/5">
                <View className="flex-row items-center gap-3">
                  <HelpCircle size={20} stroke="#94a3b8" />
                  <Text className="text-white font-display-semibold">Help Center</Text>
                </View>
                <ChevronRight size={16} stroke="#64748b" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-between p-4">
                <View className="flex-row items-center gap-3">
                  <Info size={20} stroke="#94a3b8" />
                  <Text className="text-white font-display-semibold">About Us</Text>
                </View>
                <ChevronRight size={16} stroke="#64748b" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Logout */}
          <TouchableOpacity className="mt-4 flex-row items-center justify-center gap-3 p-5 bg-slate-800/20 rounded-3xl border border-primary/20">
            <LogOut size={20} stroke="#ff4255" />
            <Text className="text-[#ff4255] font-display-bold">Sign Out</Text>
          </TouchableOpacity>

          <View className="items-center mt-4 pb-10">
            <Text className="text-slate-600 font-display-medium text-xs">Friendly Buddy v1.0.2</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
