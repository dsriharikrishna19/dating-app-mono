import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Heart, X, Star, MapPin, Globe, Award, SlidersHorizontal } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function ExploreScreen() {
  const router = useRouter();
  const [showMatch, setShowMatch] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);
  const [isExhausted, setIsExhausted] = React.useState(false);

  const onLike = () => {
    // Simulate a match
    setShowMatch(true);
  };

  const onDislike = () => {
    // Simulate exhaustion for demo
    setIsExhausted(true);
  };

  return (
    <View className="flex-1 bg-background-dark">
      <SafeAreaView className="flex-1 p-0">
        <View className="flex flex-row items-center justify-between px-6 pt-4 pb-2">
          <View className="flex-row items-center gap-2">
            <View className="w-8 h-8 bg-primary rounded-lg items-center justify-center">
              <Heart size={20} stroke="white" fill="white" />
            </View>
            <Text className="text-xl font-display-bold tracking-tight text-white">Discover</Text>
          </View>
          <TouchableOpacity 
            onPress={() => setShowFilters(true)}
            className="w-10 h-10 rounded-full bg-slate-800 items-center justify-center"
          >
            <SlidersHorizontal size={20} stroke="#94a3b8" />
          </TouchableOpacity>
        </View>

        {isExhausted ? (
          <View className="flex-1 items-center justify-center px-10">
            <View className="size-24 rounded-full bg-slate-800 items-center justify-center mb-6">
              <Globe size={40} stroke="#64748b" />
            </View>
            <Text className="text-white text-2xl font-display-bold text-center mb-2">That's All for Now!</Text>
            <Text className="text-slate-500 text-center font-display mb-8">
              You've seen everyone nearby. Try expanding your search area or checking back later.
            </Text>
            <TouchableOpacity 
              onPress={() => setIsExhausted(false)}
              className="bg-primary px-8 py-4 rounded-2xl shadow-lg shadow-primary/20"
            >
              <Text className="text-white font-display-bold">Expand Search Range</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-1 relative px-4 py-4 justify-center">
            {/* Swipe Card */}
            <TouchableOpacity 
              activeOpacity={0.9}
              className="self-center"
              onPress={() => router.push({
                pathname: '/user/[id]',
                params: {
                  id: 'elena-123',
                  name: 'Elena',
                  age: '26',
                  distance: 'Downtown, 3 miles away',
                  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpthbiXRIkyF3nsfPmoHOqTw-oGkk0n6FuWR2J2rAVOdiXkcMDdAbdsKrDKgIS0zT-b2HZDIgUBEclP14ovG-idvu4SOOEASNwfXqChZfyPkHJsvTg30cU4MNeV6YCqYv403C8bOECCeXxN-tWeDmUmv8lSO-ulSdRP0aeqQW7ZHT4y28ooKkRJg0GNOGQhRr0Q8ASf7OFVEXqhIMehvvit-SyOqwuQsBbT_sr-GHK3wtrF50AriatD5-FrhW92QjrbAPh1InES98',
                  bio: 'Graphic designer by day, amateur salsa dancer by night. Looking for someone to explore hidden jazz bars with. 🎷✨'
                }
              })}
            >
              <View 
                style={{ width: width - 32, height: (width - 32) * 1.33 }}
                className="rounded-[32px] overflow-hidden shadow-2xl relative"
              >
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpthbiXRIkyF3nsfPmoHOqTw-oGkk0n6FuWR2J2rAVOdiXkcMDdAbdsKrDKgIS0zT-b2HZDIgUBEclP14ovG-idvu4SOOEASNwfXqChZfyPkHJsvTg30cU4MNeV6YCqYv403C8bOECCeXxN-tWeDmUmv8lSO-ulSdRP0aeqQW7ZHT4y28ooKkRJg0GNOGQhRr0Q8ASf7OFVEXqhIMehvvit-SyOqwuQsBbT_sr-GHK3wtrF50AriatD5-FrhW92QjrbAPh1InES98' }}
                className="absolute inset-0"
                resizeMode="cover"
              />
              
              <LinearGradient
                colors={['transparent', 'rgba(15, 23, 42, 0.4)', 'rgba(15, 23, 42, 0.95)']}
                locations={[0.5, 0.7, 1]}
                className="absolute inset-0"
              />

              <View className="absolute inset-x-0 bottom-0 p-6">
                <View className="flex-row items-baseline gap-2 mb-1">
                  <Text className="text-3xl font-display-bold text-white">Elena, 26</Text>
                  <Award size={18} stroke="#60a5fa" fill="#60a5fa" />
                </View>
                
                <View className="flex-row items-center gap-2 mb-4">
                  <MapPin size={14} stroke="#ff4255" fill="#ff4255" />
                  <Text className="text-slate-200 text-sm font-display">Downtown, 3 miles away</Text>
                </View>

                <Text className="text-slate-200 text-base mb-4 leading-relaxed font-display" numberOfLines={2}>
                  Graphic designer by day, amateur salsa dancer by night. Looking for someone to explore hidden jazz bars with. 🎷✨
                </Text>

                <View className="flex-row flex-wrap gap-2">
                  {['Salsa Dancing', 'Jazz Music', 'Coffee Art'].map((interest) => (
                    <View 
                      key={interest} 
                      className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md"
                    >
                      <Text className="text-white text-xs font-display-medium">{interest}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Progress/Stories Indicators */}
              <View className="absolute top-4 left-4 right-4 flex-row gap-1">
                <View className="h-1 flex-1 bg-white rounded-full" />
                <View className="h-1 flex-1 bg-white/30 rounded-full" />
                <View className="h-1 flex-1 bg-white/30 rounded-full" />
              </View>
              </View>
            </TouchableOpacity>

            {/* Action Buttons */}
            <View className="mt-8 flex-row items-center justify-center gap-6">
              <TouchableOpacity 
                onPress={onDislike}
                className="w-14 h-14 rounded-full bg-slate-800 items-center justify-center border border-slate-700 active:scale-90 shadow-lg"
              >
                <X size={30} stroke="#ff4255" strokeWidth={2.5} />
              </TouchableOpacity>
              
              <TouchableOpacity className="w-12 h-12 rounded-full bg-slate-800 items-center justify-center border border-slate-700 active:scale-90 shadow-lg">
                <Star size={24} stroke="#a855f7" fill="#a855f7" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={onLike}
                className="w-14 h-14 rounded-full bg-primary items-center justify-center active:scale-90 shadow-xl shadow-primary/30"
              >
                <Heart size={30} stroke="white" fill="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* It's a Match Modal */}
        {showMatch && (
          <View className="absolute inset-0 z-50">
            <LinearGradient
              colors={['rgba(255, 68, 88, 0.95)', 'rgba(168, 85, 247, 0.95)']}
              className="flex-1 items-center justify-center px-10"
            >
              <View className="items-center mb-10">
                <Text className="text-white text-5xl font-display-extrabold text-center mb-2 italic">It's a Match!</Text>
                <Text className="text-white/80 text-lg font-display-medium text-center">You and Elena liked each other</Text>
              </View>

              <View className="flex-row items-center gap-6 mb-12">
                <View className="size-32 rounded-full border-4 border-white overflow-hidden shadow-2xl">
                  <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp5FsmI7jbP62GC8yB1fP640jGcxcTT7eHwcEHqDjplR6-9mVhYB_pepGfOnVGAFKKUZsC_cOLrWvwjzEz9ggpqiuS4ACYayOC5TqpHtZe-gyws1l4Ek-seZf97RHt1nq8N4_B6dfS1eY8HnzD-6QRm6HiAovKScysFgkh5_0SIsgxwHUEyWEyNJ70flg7fMALN9ht7bqVFzeK6yen_kmCnjRxyYVfRmVMHwZ0Jy-aBYcvxTvR6WPCVmp6Yz_1AKDagnuf1eQd9sc' }} className="w-full h-full" />
                </View>
                <View className="size-10 bg-white rounded-full items-center justify-center shadow-lg">
                  <Heart size={20} stroke="#ff4255" fill="#ff4255" />
                </View>
                <View className="size-32 rounded-full border-4 border-white overflow-hidden shadow-2xl">
                  <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDONL268h7sGiMFa1oWozc2n0SZ15WnqY8X7NdglKZKahXAgyCLHJA4memYxvyh-KNip4FFBZdsEQ5sP8mEF8WHfE92WPJsbiltYJNvqpI-cfJuLojhmnPlhxsmbtx-2xbmmxAEGe5h5N8QH-sjQU0yqNLl-ISrBKUHhCCNO8awI8dkQeTgzYvXWyR6xZIuWTFPLNTJBnx7hFW8f-nGzUDCws3mBnDn_905_EB8hssivVY9BlyxDAzkQX9Z8HybAI81fpwFydTMv_M' }} className="w-full h-full" />
                </View>
              </View>

              <View className="w-full gap-4">
                <TouchableOpacity 
                  onPress={() => {
                    setShowMatch(false);
                    router.push('/chats');
                  }}
                  className="w-full h-16 bg-white rounded-2xl items-center justify-center shadow-lg"
                >
                  <Text className="text-primary font-display-bold text-lg">Send a Message</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => setShowMatch(false)}
                  className="w-full h-16 border border-white/40 rounded-2xl items-center justify-center"
                >
                  <Text className="text-white font-display-bold text-lg">Keep Swiping</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Filters Modal */}
        {showFilters && (
          <View className="absolute inset-0 z-50 justify-end">
            <TouchableOpacity 
              activeOpacity={1} 
              onPress={() => setShowFilters(false)}
              className="absolute inset-0 bg-black/60"
            />
            <View className="bg-slate-900 rounded-t-[40px] px-8 pt-10 pb-12 border-t border-white/10">
              <View className="flex-row items-center justify-between mb-8">
                <Text className="text-white text-2xl font-display-bold">Filters</Text>
                <TouchableOpacity 
                  onPress={() => setShowFilters(false)}
                  className="size-10 rounded-full bg-slate-800 items-center justify-center"
                >
                  <X size={20} stroke="white" />
                </TouchableOpacity>
              </View>

              <View className="gap-8">
                <View>
                  <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-slate-400 font-display-bold uppercase tracking-widest text-xs">Distance Range</Text>
                    <Text className="text-primary font-display-bold">Up to 50 miles</Text>
                  </View>
                  <View className="h-1.5 bg-slate-800 rounded-full relative">
                    <View className="absolute inset-y-0 left-0 w-2/3 bg-primary rounded-full" />
                    <View className="absolute -top-2 left-[66%] size-6 bg-white rounded-full border-4 border-primary shadow-lg" />
                  </View>
                </View>

                <View>
                  <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-slate-400 font-display-bold uppercase tracking-widest text-xs">Age Range</Text>
                    <Text className="text-primary font-display-bold">22 - 30 years</Text>
                  </View>
                  <View className="h-1.5 bg-slate-800 rounded-full relative">
                    <View className="absolute inset-y-0 left-[20%] right-[40%] bg-primary rounded-full" />
                    <View className="absolute -top-2 left-[20%] size-6 bg-white rounded-full border-4 border-primary shadow-lg" />
                    <View className="absolute -top-2 right-[40%] size-6 bg-white rounded-full border-4 border-primary shadow-lg" />
                  </View>
                </View>

                <View>
                  <Text className="text-slate-400 font-display-bold uppercase tracking-widest text-xs mb-4">Show Me</Text>
                  <View className="flex-row gap-3">
                    {['Men', 'Women', 'Everyone'].map((opt) => (
                      <TouchableOpacity 
                        key={opt}
                        className={`flex-1 py-4 rounded-2xl border items-center justify-center ${opt === 'Women' ? 'bg-primary border-primary' : 'bg-slate-800 border-slate-700'}`}
                      >
                        <Text className={`font-display-bold ${opt === 'Women' ? 'text-white' : 'text-slate-400'}`}>{opt}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              <TouchableOpacity 
                onPress={() => setShowFilters(false)}
                className="w-full h-16 bg-primary rounded-2xl items-center justify-center mt-12 shadow-lg shadow-primary/20"
              >
                <Text className="text-white font-display-bold text-lg">Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
