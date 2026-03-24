import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Share2, MoreVertical, MapPin, Award, Sparkles, Heart, X, Star, ShieldAlert } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppDispatch } from '../../store/hooks';
import { discoveryService } from '../../services/discovery.service';
import { nextProfile } from '../../store/slices/discoverySlice';

const { width } = Dimensions.get('window');

const GALLERY = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD8U_0c7onksP9cLNGZ6S_A2Vvr3zXeVnagQf0W87GmofGNpnMPosze65EZHVpO2L7YPm2gUjXjqCwz77RwFIX5mNL-JYnTRKmx2JwXe1xB6UkQ67aNDnNx0hNHVRJ-FCv9L6Zsv58LC4WpfvyNblburN-tGItFHPk7PZl4GvVjm3XtqL6mzIj_wlGPi3Gbt6BfSDinss09iFPTa5ctZdryknJN0_vFperc6uSetX9DKsN8nQjlyC6XKWi9KfRT7HAxNLrnGMVpDCU',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQCsm5iCgtAQueSVQmst-pbiF0iZjYhv3XlQ0H7wYjiiU8tH3C_wRL0y-U1YyYlkFhkHx1HM8aqYa_H1qWa98Ef1IVRpFvnwouQzS4C1WdrTnpJM7plrx7r4LiJIo4l4cD1_SfuWKTP0ity-FWCM-oCYZyO1uy34d06JTCkLspdovS2xfYrBuuw-IRqHK8Kdkh3nrD7yTb3n0B5X32VJOgFQ-EMKEscqhOCICoWO5sRwFCB-PuglwvdlqE99QmkWBNTbUhEZy3-48',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCKdtnDIpUSwZ34kjDYieuzfTk5txulcozgiPO93Ik3wgHBqzidGLp3ZMbgXpxAFVzPT2pycVsVk6JVMWO8JYwcOBYlaB9gZtkpDfdq-1IBKRDkcwRwPwE-6iW1bg-7GyE80tErhSHElq8fe3JqBG4pmO9h9yoYdlhQh-iBDMylNV6qxb_xzQ8m5_zGTb5gZfRfYDz5t1cTGlGPxlZHFCps_ClIImQ5tMq9B5Vu6aFiyZ2y3SEiZMnX4F6n4MGqY6i48uIcibfOu5s',
];

export default function UserDetailScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id, name, age, distance, image, bio, interests: interestsRaw, images: imagesRaw } = useLocalSearchParams();

  const interests = interestsRaw ? JSON.parse(interestsRaw as string) : [];
  const gallery = imagesRaw ? JSON.parse(imagesRaw as string) : [];

  const handleSwipe = async (type: 'LIKE' | 'DISLIKE' | 'SUPERLIKE') => {
    try {
      const direction = type === 'DISLIKE' ? 'LEFT' : 'RIGHT';
      await discoveryService.swipe(id as string, direction);
      dispatch(nextProfile());
      router.back();
    } catch (err) {
      console.error('Swipe from detail error:', err);
      router.back();
    }
  };

  return (
    <View className="flex-1 bg-background-dark">
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="relative w-full aspect-[3/4]">
          <Image 
            source={{ uri: (image as string) || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpthbiXRIkyF3nsfPmoHOqTw-oGkk0n6FuWR2J2rAVOdiXkcMDdAbdsKrDKgIS0zT-b2HZDIgUBEclP14ovG-idvu4SOOEASNwfXqChZfyPkHJsvTg30cU4MNeV6YCqYv403C8bOECCeXxN-tWeDmUmv8lSO-ulSdRP0aeqQW7ZHT4y28ooKkRJg0GNOGQhRr0Q8ASf7OFVEXqhIMehvvit-SyOqwuQsBbT_sr-GHK3wtrF50AriatD5-FrhW92QjrbAPh1InES98' }}
            className="w-full h-full"
          />
          <LinearGradient
            colors={['rgba(15, 23, 42, 0.4)', 'rgba(15, 23, 42, 0.95)']}
            locations={[0.7, 1]}
            className="absolute inset-0"
          />
          
          <SafeAreaView className="absolute inset-x-0 top-0">
            <View className="flex-row items-center justify-between p-4">
              <TouchableOpacity onPress={() => router.back()} className="size-10 rounded-full bg-black/20 items-center justify-center border border-white/10">
                <ArrowLeft size={20} stroke="white" />
              </TouchableOpacity>
              <View className="flex-row gap-2">
                <TouchableOpacity className="size-10 rounded-full bg-black/20 items-center justify-center border border-white/10">
                  <Share2 size={20} stroke="white" />
                </TouchableOpacity>
                <TouchableOpacity className="size-10 rounded-full bg-black/20 items-center justify-center border border-white/10">
                  <MoreVertical size={20} stroke="white" />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>

          <View className="absolute bottom-6 left-6 right-6">
            <View className="flex-row items-center gap-2 mb-1">
              <Text className="text-4xl font-display-extrabold text-white">{name || 'Elena'}, {age || '26'}</Text>
              <Award size={24} stroke="#60a5fa" fill="#60a5fa" />
            </View>
            <View className="flex-row items-center gap-2">
              <MapPin size={14} stroke="#ff4255" fill="#ff4255" />
              <Text className="text-slate-200 text-sm font-display">{distance || 'Downtown, 3 miles away'}</Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <View className="px-6 py-8 gap-10">
          {/* About */}
          <View>
            <View className="flex-row items-center gap-2 mb-4">
              <Sparkles size={18} stroke="#ff4255" />
              <Text className="text-lg font-display-bold text-white">About</Text>
            </View>
            <Text className="text-slate-300 leading-relaxed font-display text-base">
              {bio || "Graphic designer by day, amateur salsa dancer by night. Looking for someone to explore hidden jazz bars with. 🎷✨"}
            </Text>
          </View>

          {/* Interests */}
          <View>
            <Text className="text-lg font-display-bold text-white mb-4">Interests</Text>
            <View className="flex-row flex-wrap gap-2.5">
              {interests.map((item: any) => (
                <View key={item.id} className="px-4 py-2 rounded-full bg-slate-800/20 border border-primary/20">
                  <Text className="text-slate-200 text-xs font-display-semibold">{item.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Photo Gallery */}
          <View>
            <Text className="text-lg font-display-bold text-white mb-4">Photo Gallery</Text>
            <View className="flex-row gap-2.5">
              {gallery.map((img: any, i: number) => (
                <View key={i} className="flex-1 aspect-square rounded-2xl overflow-hidden shadow-sm">
                  <Image source={{ uri: img.url }} className="w-full h-full" />
                </View>
              ))}
            </View>
          </View>

          {/* Interaction Guide */}
          <View className="p-5 rounded-3xl bg-slate-800/10 border border-white/5 items-center">
            <ShieldAlert size={20} stroke="#64748b" />
            <Text className="text-slate-500 text-xs font-display-medium mt-2 text-center">
              Safety First: Always meet in public places and let a friend know your plans.
            </Text>
          </View>

          <View className="h-24" />
        </View>
      </ScrollView>

      {/* Floating Action Buttons */}
      <SafeAreaView className="absolute inset-x-0 bottom-4">
        <View className="flex-row items-center justify-center gap-6">
          <TouchableOpacity 
            onPress={() => handleSwipe('DISLIKE')}
            className="w-16 h-16 rounded-full bg-slate-800 items-center justify-center border border-slate-700 active:scale-90 shadow-2xl"
          >
            <X size={32} stroke="#ff4255" strokeWidth={2.5} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => handleSwipe('SUPERLIKE')}
            className="w-14 h-14 rounded-full bg-slate-800 items-center justify-center border border-slate-700 active:scale-90 shadow-2xl"
          >
            <Star size={24} stroke="#a855f7" fill="#a855f7" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => handleSwipe('LIKE')}
            className="w-16 h-16 rounded-full bg-primary items-center justify-center active:scale-90 shadow-2xl shadow-primary/30"
          >
            <Heart size={32} stroke="white" fill="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
