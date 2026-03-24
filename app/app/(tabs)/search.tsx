import React from 'react';
import { View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Search as SearchIcon, SlidersHorizontal, Flame, MapPin, Music, Camera, Bike, Pizza, Code, Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const TRENDING = [
  { id: 1, label: 'Photography', icon: Camera, stroke: '#ff4255' },
  { id: 2, label: 'Cycling', icon: Bike, stroke: '#3b82f6' },
  { id: 3, label: 'Music', icon: Music, stroke: '#a855f7' },
];

const CATEGORIES = [
  { id: 1, name: 'Foodies', stroke: '#f59e0b', icon: Pizza },
  { id: 2, name: 'Gamers', stroke: '#10b981', icon: Heart },
  { id: 3, name: 'Developers', stroke: '#6366f1', icon: Code },
  { id: 4, name: 'Adventure', stroke: '#ef4444', icon: MapPin },
];

const NEARBY = [
  { id: 1, name: 'Maya', distance: '1.2 miles', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI9JFkAN8UHe4RA-1CGmpA5tJNrrDRY2XL5yiKjsls_i9oszUigpaT7rtoNmfCsSeaTO3aX6tNhvXM7X_EeUzZgpyppD7EbmhQTqNv_A37uMQgDq92Jnyz-wvG94PLCgiY6AB1Ge9VSY9zj49E1SX_sRFq8hTO9r1EEf9l3qwgXqiX6RCWiGelkQIxhmxkyp7ewJ1NEBUgrRjDndP8UBGRcJcOGVmlvmNJVcT3UfH5rVNKzBZD6429Nt_7CwKZknIjvZ8EPbdlRCM' },
  { id: 2, name: 'Chloe', distance: '2.5 miles', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpthbiXRIkyF3nsfPmoHOqTw-oGkk0n6FuWR2J2rAVOdiXkcMDdAbdsKrDKgIS0zT-b2HZDIgUBEclP14ovG-idvu4SOOEASNwfXqChZfyPkHJsvTg30cU4MNeV6YCqYv403C8bOECCeXxN-tWeDmUmv8lSO-ulSdRP0aeqQW7ZHT4y28ooKkRJg0GNOGQhRr0Q8ASf7OFVEXqhIMehvvit-SyOqwuQsBbT_sr-GHK3wtrF50AriatD5-FrhW92QjrbAPh1InES98' },
  { id: 3, name: 'Sophia', distance: '0.8 miles', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp5FsmI7jbP62GC8yB1fP640jGcxcTT7eHwcEHqDjplR6-9mVhYB_pepGfOnVGAFKKUZsC_cOLrWvwjzEz9ggpqiuS4ACYayOC5TqpHtZe-gyws1l4Ek-seZf97RHt1nq8N4_B6dfS1eY8HnzD-6QRm6HiAovKScysFgkh5_0SIsgxwHUEyWEyNJ70flg7fMALN9ht7bqVFzeK6yen_kmCnjRxyYVfRmVMHwZ0Jy-aBYcvxTvR6WPCVmp6Yz_1AKDagnuf1eQd9sc' },
  { id: 4, name: 'Elena', distance: '3.1 miles', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAg6zTN_cEHLkgi1aXPymiTLEdUP5RvVqxKMg-SZ1tqxflR8i70mvhCsf4HwKjQVXH_12xsesP-XL0Z8MR34qFVWXD48bh4M96Hm-TUwBcnZadyHm-iGJ6O0_u-L4nzjE-wwKO095tuV8kXZJtpQ7dFHq7gHfpnKBMLrZE-_RyE2hGbq6DSnJyp3TG7mSIoj1bn3Pvc0FZYMAgUPYx7qtKCUv7Rk_9QRruEG6QswPPa2_V64_NdO2Si2XdgpKeKhFj8Kg8k3OaaCQ' },
];

export default function SearchScreen() {
  return (
    <View className="flex-1 bg-background-dark">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-3xl font-display-bold text-white mb-6">Discovery</Text>
          
          <View className="flex-row items-center gap-3">
            <View className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 h-14 flex-row items-center gap-3">
              <SearchIcon size={20} stroke="#64748b" />
              <TextInput
                className="flex-1 text-white font-display-medium placeholder:text-slate-500"
                placeholder="Search for people or interests"
                placeholderTextColor="#64748b"
              />
            </View>
            <TouchableOpacity className="size-14 rounded-2xl bg-primary items-center justify-center shadow-lg shadow-primary/20">
              <SlidersHorizontal size={20} stroke="white" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Trending Now */}
          <View className="mt-6">
            <View className="px-6 flex-row items-center gap-2 mb-4">
              <Flame size={18} stroke="#ff4255" fill="#ff4255" />
              <Text className="text-sm font-display-bold text-slate-500 uppercase tracking-widest">Trending Now</Text>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6">
              {TRENDING.map((item) => (
                <TouchableOpacity key={item.id} className="mr-4 overflow-hidden rounded-2xl">
                  <LinearGradient
                    colors={[item.stroke + '20', 'transparent']}
                    className="px-6 py-4 flex-row items-center gap-3 bg-slate-800/20 border border-white/5"
                  >
                    <item.icon size={18} stroke={item.stroke} />
                    <Text className="text-white font-display-bold">{item.label}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Categories Grid */}
          <View className="mt-10 px-6">
            <Text className="text-sm font-display-bold text-slate-500 uppercase tracking-widest mb-6">Explore Categories</Text>
            
            <View className="flex-row flex-wrap justify-between gap-y-4">
              {CATEGORIES.map((cat) => (
                <TouchableOpacity 
                  key={cat.id} 
                  style={{ width: (width - 60) / 2 }}
                  className="h-24 rounded-3xl overflow-hidden relative"
                >
                  <LinearGradient
                    colors={[cat.stroke + '40', cat.stroke + '10']}
                    className="w-full h-full p-4 justify-between"
                  >
                    <cat.icon size={24} stroke="white" />
                    <Text className="text-white font-display-extrabold text-lg">{cat.name}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Nearby Section */}
          <View className="mt-12 px-6 pb-20">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-sm font-display-bold text-slate-500 uppercase tracking-widest">People Near You</Text>
              <TouchableOpacity>
                <Text className="text-primary font-display-bold text-sm">View Map</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row flex-wrap justify-between gap-y-6">
              {NEARBY.map((person) => (
                <TouchableOpacity 
                  key={person.id}
                  style={{ width: (width - 60) / 2 }}
                  className="rounded-3xl overflow-hidden shadow-2xl bg-slate-800/20 border border-white/5"
                >
                  <Image source={{ uri: person.image }} className="w-full aspect-square" />
                  <LinearGradient
                    colors={['transparent', 'rgba(15, 23, 42, 0.8)']}
                    className="absolute inset-0 justify-end p-4"
                  >
                    <Text className="text-white font-display-bold text-base leading-tight">{person.name}</Text>
                    <View className="flex-row items-center gap-1 mt-1">
                      <MapPin size={10} stroke="#ff4255" fill="#ff4255" />
                      <Text className="text-slate-300 text-[10px] font-display">{person.distance}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
