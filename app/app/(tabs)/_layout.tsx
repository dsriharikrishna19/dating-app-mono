import React from 'react';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { Search, Heart, MessageCircle, User, Sparkles } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0F172A',
          borderTopWidth: 0,
          elevation: 0,
          height: 85,
          paddingBottom: 25,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#FF4458',
        tabBarInactiveTintColor: '#64748B',
        tabBarLabelStyle: {
          fontFamily: 'PlusJakartaSans_700Bold',
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => <Heart size={size} stroke={color} fill={color === '#FF4458' ? '#FF4458' : 'transparent'} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, size }) => <Search size={size} stroke={color} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="ideas"
        options={{
          title: 'Ideas',
          tabBarIcon: ({ color, size }) => <Sparkles size={size} stroke={color} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color, size }) => (
            <View className="relative">
              <MessageCircle size={size} stroke={color} strokeWidth={2.5} />
              <View className="absolute -top-1 -right-1 size-2.5 bg-primary rounded-full border-2 border-slate-900" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} stroke={color} strokeWidth={2.5} />,
        }}
      />
    </Tabs>
  );
}
