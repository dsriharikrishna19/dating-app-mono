import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Sparkles, Lightbulb, MessageCircle, Heart, MapPin, Coffee, Plane, Music } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const IDEAS = [
  {
    id: 1,
    category: 'Travel',
    topic: 'What\'s your dream destination for a first solo trip?',
    color: ['#ff4255', '#ff8a5c'],
    icon: Plane,
    stats: '142 people inspired',
  },
  {
    id: 2,
    category: 'Daily',
    topic: 'Best coffee spot in the city for a first date?',
    color: ['#a855f7', '#ec4899'],
    icon: Coffee,
    stats: '89 people inspired',
  },
  {
    id: 3,
    category: 'Music',
    topic: 'Which concert changed your life forever?',
    color: ['#3b82f6', '#2dd4bf'],
    icon: Music,
    stats: '256 people inspired',
  },
];

export default function IdeasScreen() {
  return (
    <View className="flex-1 bg-background-dark">
      <SafeAreaView className="flex-1">
        <View className="px-6 pt-6 pb-4">
          <Text className="text-3xl font-display-bold text-white mb-2">Daily Ideas</Text>
          <Text className="text-slate-500 font-display-medium">Get inspired and find common ground</Text>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Topic of the Day */}
          <View className="px-6 mt-6">
            <TouchableOpacity className="rounded-[32px] overflow-hidden shadow-2xl">
              <LinearGradient
                colors={['#ff4255', '#a855f7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="p-8"
              >
                <View className="flex-row justify-between items-start mb-6">
                  <View className="bg-white/20 p-3 rounded-2xl border border-white/20">
                    <Sparkles size={24} stroke="white" fill="white" />
                  </View>
                  <View className="bg-black/20 px-4 py-1.5 rounded-full border border-white/10">
                    <Text className="text-white text-[10px] font-display-bold uppercase tracking-widest">Topic of the day</Text>
                  </View>
                </View>

                <Text className="text-white text-2xl font-display-extrabold mb-6 leading-tight">
                  "If you could teleport anywhere right now, where would you go and why?"
                </Text>

                <View className="flex-row items-center justify-between">
                  <View className="flex-row -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <View key={i} className="size-8 rounded-full border-2 border-[#ff4255] bg-slate-800 shadow-sm" />
                    ))}
                    <View className="size-8 rounded-full bg-white/20 items-center justify-center border-2 border-[#ff4255]">
                      <Text className="text-white text-[10px] font-display-bold">+42</Text>
                    </View>
                  </View>
                  <TouchableOpacity className="bg-white px-6 py-3 rounded-2xl shadow-md">
                    <Text className="text-[#ff4255] font-display-bold">Share Yours</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Categories Horizontal */}
          <View className="mt-10">
            <View className="px-6 flex-row justify-between items-center mb-6">
              <Text className="text-sm font-display-bold text-slate-500 uppercase tracking-widest">Explore Threads</Text>
              <TouchableOpacity>
                <Text className="text-primary font-display-bold text-sm">See All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6">
              {['Adventure', 'Lifestyle', 'Values', 'Fun Stuff'].map((cat) => (
                <TouchableOpacity key={cat} className="mr-4 px-6 py-3.5 rounded-2xl bg-slate-800/40 border border-white/5">
                  <Text className="text-slate-300 font-display-bold">{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Ideas Cards List */}
          <View className="px-6 mt-10 pb-20 gap-6">
            {IDEAS.map((idea) => (
              <TouchableOpacity key={idea.id} className="rounded-3xl bg-slate-800/20 border border-white/5 overflow-hidden">
                <View className="p-6">
                  <View className="flex-row items-center gap-3 mb-4">
                    <View className="p-2.5 rounded-xl bg-slate-800/50">
                      <idea.icon size={20} stroke={idea.color[0]} />
                    </View>
                    <Text className="text-slate-500 text-xs font-display-bold uppercase tracking-widest">{idea.category}</Text>
                  </View>
                  
                  <Text className="text-white text-lg font-display-bold mb-6 leading-snug">
                    {idea.topic}
                  </Text>

                  <View className="flex-row items-center justify-between border-t border-white/5 pt-4">
                    <View className="flex-row items-center gap-1.5">
                      <Heart size={14} stroke="#64748b" />
                      <Text className="text-slate-500 text-xs font-display">{idea.stats}</Text>
                    </View>
                    <View className="flex-row items-center gap-1.5">
                      <MessageCircle size={14} stroke="#64748b" />
                      <Text className="text-slate-500 text-xs font-display">24 replies</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
