import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Heart, X, Star, MapPin, Globe, Award, SlidersHorizontal } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setProfiles, nextProfile, setExhausted, updateFilters } from '../../store/slices/discoverySlice';
import { decrementLikes } from '../../store/slices/userSlice';
import { discoveryService } from '../../services/discovery.service';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  interpolate, 
  Extrapolate,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default function ExploreScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const { profiles, currentIndex, exhausted, filters } = useAppSelector((state) => state.discovery);
  const { profile, likesRemaining } = useAppSelector((state) => state.user);
  const currentUser = useAppSelector((state) => state.auth.user);

  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const currentProfile = profiles[currentIndex];

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await discoveryService.getFeed();
        dispatch(setProfiles(response.data));
      } catch (err) {
        console.error('Fetch Profiles Error:', err);
        // Fallback demo profiles if backend fails
        dispatch(setProfiles([
          {
            id: 'elena-123',
            name: 'Elena',
            age: 26,
            distance: '3 miles away',
            bio: 'Graphic designer by day, amateur salsa dancer by night. Looking for someone to explore hidden jazz bars with. 🎷✨',
            images: [{ id: 'img1', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpthbiXRIkyF3nsfPmoHOqTw-oGkk0n6FuWR2J2rAVOdiXkcMDdAbdsKrDKgIS0zT-b2HZDIgUBEclP14ovG-idvu4SOOEASNwfXqChZfyPkHJsvTg30cU4MNeV6YCqYv403C8bOECCeXxN-tWeDmUmv8lSO-ulSdRP0aeqQW7ZHT4y28ooKkRJg0GNOGQhRr0Q8ASf7OFVEXqhIMehvvit-SyOqwuQsBbT_sr-GHK3wtrF50AriatD5-FrhW92QjrbAPh1InES98', isPrimary: true }],
            interests: [{ id: 'i1', name: 'Salsa Dancing' }, { id: 'i2', name: 'Jazz Music' }, { id: 'i3', name: 'Coffee Art' }]
          }
        ]));
      }
    };

    if (profiles.length === 0) {
      fetchProfiles();
    }
  }, [profiles.length, dispatch]);

  const rotate = useAnimatedStyle(() => {
    const rotation = interpolate(
      translateX.value,
      [-width / 2, 0, width / 2],
      [-10, 0, 10],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation}deg` },
        { scale: scale.value }
      ],
    };
  });

  const likeOpacity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateX.value, [0, width / 4], [0, 1], Extrapolate.CLAMP),
    };
  });

  const nopeOpacity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateX.value, [-width / 4, 0], [1, 0], Extrapolate.CLAMP),
    };
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      scale.value = withSpring(1.05);
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > width * 0.3) {
        if (event.translationX > 0) {
          runOnJS(onLike)();
        } else {
          runOnJS(onDislike)();
        }
        
        translateX.value = withTiming(event.translationX > 0 ? width * 1.5 : -width * 1.5, { duration: 200 });
        
        setTimeout(() => {
          translateX.value = 0;
          translateY.value = 0;
          scale.value = 1;
        }, 300);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        scale.value = withSpring(1);
      }
    });

  const onLike = async () => {
    if (!currentProfile) return;
    if (!profile?.isGold && likesRemaining <= 0) {
      router.push('/premium');
      return;
    }
    
    try {
      const Haptics = require('expo-haptics');
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      
      const response = await discoveryService.swipe(currentProfile.id, 'RIGHT');
      dispatch(decrementLikes());
      
      if (response.data.match) {
        setMatchedProfile(currentProfile);
        setShowMatch(true);
      }
      dispatch(nextProfile());
    } catch (err) {
      console.error('Like Error:', err);
      dispatch(nextProfile());
    }
  };

  const onDislike = async () => {
    if (!currentProfile) return;
    try {
      const Haptics = require('expo-haptics');
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await discoveryService.swipe(currentProfile.id, 'LEFT');
      dispatch(nextProfile());
    } catch (err) {
      console.error('Dislike Error:', err);
      dispatch(nextProfile());
    }
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

        {exhausted || !currentProfile ? (
          <View className="flex-1 items-center justify-center px-10">
            <View className="size-24 rounded-full bg-slate-800 items-center justify-center mb-6">
              <Globe size={40} stroke="#64748b" />
            </View>
            <Text className="text-white text-2xl font-display-bold text-center mb-2">That's All for Now!</Text>
            <Text className="text-slate-500 text-center font-display mb-8">
              You've seen everyone nearby. Try expanding your search area or checking back later.
            </Text>
            <TouchableOpacity 
              onPress={() => dispatch(setExhausted(false))}
              className="bg-primary px-8 py-4 rounded-2xl shadow-lg shadow-primary/20"
            >
              <Text className="text-white font-display-bold">Expand Search Range</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-1 relative px-4 py-4 justify-center">
            {/* Swipe Card */}
            <GestureDetector gesture={gesture}>
              <Animated.View 
                style={[rotate]}
                className="self-center z-10"
              >
                <TouchableOpacity 
                  activeOpacity={1}
                  onPress={() => router.push({
                    pathname: '/user/[id]',
                    params: {
                      id: currentProfile.id,
                      name: currentProfile.name,
                      age: currentProfile.age.toString(),
                      image: currentProfile.images[0]?.url,
                      bio: currentProfile.bio,
                      interests: JSON.stringify(currentProfile.interests),
                      images: JSON.stringify(currentProfile.images),
                    }
                  })}
                >
                  <View 
                    style={{ width: width - 32, height: (width - 32) * 1.33 }}
                    className="rounded-[32px] overflow-hidden shadow-2xl relative bg-slate-800"
                  >
                  <Image 
                    source={{ uri: currentProfile.images[0]?.url }}
                    className="absolute inset-0"
                    resizeMode="cover"
                  />
                  
                  {/* LIKE/NOPE Overlays */}
                  <Animated.View style={[likeOpacity]} className="absolute top-10 left-6 z-20 border-4 border-emerald-500 rounded-xl px-4 py-1 rotate-[-15deg]">
                    <Text className="text-emerald-500 text-4xl font-display-extrabold uppercase">Like</Text>
                  </Animated.View>
                  
                  <Animated.View style={[nopeOpacity]} className="absolute top-10 right-6 z-20 border-4 border-primary rounded-xl px-4 py-1 rotate-[15deg]">
                    <Text className="text-primary text-4xl font-display-extrabold uppercase">Nope</Text>
                  </Animated.View>
                  
                  <LinearGradient
                    colors={['transparent', 'rgba(15, 23, 42, 0.4)', 'rgba(15, 23, 42, 0.95)']}
                    locations={[0.5, 0.7, 1]}
                    className="absolute inset-0"
                  />

                  <View className="absolute inset-x-0 bottom-0 p-6">
                    <View className="flex-row items-baseline gap-2 mb-1">
                      <Text className="text-3xl font-display-bold text-white">{currentProfile.name}, {currentProfile.age}</Text>
                      {currentProfile.id === 'elena-123' && (
                        <View className="flex-row items-center bg-yellow-500 px-2 py-0.5 rounded-md gap-1">
                          <Star size={10} fill="#0F172A" stroke="#0F172A" />
                          <Text className="text-[10px] font-display-bold text-slate-900 uppercase">Gold</Text>
                        </View>
                      )}
                      <Award size={18} stroke="#60a5fa" fill="#60a5fa" />
                    </View>
                    
                    <View className="flex-row items-center gap-2 mb-4">
                      <MapPin size={14} stroke="#ff4255" fill="#ff4255" />
                      <Text className="text-slate-200 text-sm font-display">{currentProfile.distance}</Text>
                    </View>

                    <Text className="text-slate-200 text-base mb-4 leading-relaxed font-display" numberOfLines={2}>
                      {currentProfile.bio}
                    </Text>

                    <View className="flex-row flex-wrap gap-2">
                      {currentProfile.interests?.map((interest: any) => (
                        <View 
                          key={interest.name} 
                          className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md"
                        >
                          <Text className="text-white text-xs font-display-medium">{interest.name}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View className="absolute top-4 left-4 right-4 flex-row gap-1">
                    <View className="h-1 flex-1 bg-white rounded-full" />
                    <View className="h-1 flex-1 bg-white/30 rounded-full" />
                    <View className="h-1 flex-1 bg-white/30 rounded-full" />
                  </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </GestureDetector>

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
                  <Image source={{ uri: matchedProfile?.images[0]?.url }} className="w-full h-full" />
                </View>
                <View className="size-10 bg-white rounded-full items-center justify-center shadow-lg">
                  <Heart size={20} stroke="#ff4255" fill="#ff4255" />
                </View>
                <View className="size-32 rounded-full border-4 border-white overflow-hidden shadow-2xl">
                  <Image source={{ uri: currentUser?.profile?.images[0]?.url }} className="w-full h-full" />
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
                        onPress={() => dispatch(updateFilters({ gender: opt === 'Everyone' ? undefined : opt }))}
                        className={`flex-1 py-4 rounded-2xl border items-center justify-center ${(filters.gender === opt || (opt === 'Everyone' && !filters.gender)) ? 'bg-primary border-primary' : 'bg-slate-800 border-slate-700'}`}
                      >
                        <Text className={`font-display-bold ${(filters.gender === opt || (opt === 'Everyone' && !filters.gender)) ? 'text-white' : 'text-slate-400'}`}>{opt}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Passport Mode */}
                <View>
                  <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-slate-400 font-display-bold uppercase tracking-widest text-xs">Passport Mode</Text>
                    {profile?.isGold ? (
                       <TouchableOpacity onPress={() => {/* Logic to change location */}}>
                         <Text className="text-primary font-display-bold">Change Location</Text>
                       </TouchableOpacity>
                    ) : (
                      <View className="flex-row items-center gap-2">
                        <Text className="text-slate-600 font-display-bold">Locked</Text>
                        <View className="size-5 bg-yellow-500/20 rounded-full items-center justify-center">
                          <Award size={12} stroke="#EAB308" />
                        </View>
                      </View>
                    )}
                  </View>
                  <TouchableOpacity 
                    onPress={() => !profile?.isGold && router.push('/premium')}
                    className={`bg-slate-800 border border-white/5 rounded-2xl p-4 flex-row items-center gap-4 ${!profile?.isGold ? 'opacity-60' : ''}`}
                  >
                    <MapPin size={20} stroke={profile?.isGold ? "#FF4458" : "#64748b"} />
                    <Text className="text-white font-display flex-1">
                      {profile?.isGold ? 'Change my discovery location' : 'Unlock Passport to match anywhere'}
                    </Text>
                  </TouchableOpacity>
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
