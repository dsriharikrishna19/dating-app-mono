import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, Share2, Settings, MapPin, Award, Edit3, MoreHorizontal, Sparkles, Heart, Star, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateProfile } from '../../store/slices/userSlice';
import { userService } from '../../services/user.service';

const { width } = Dimensions.get('window');

const GALLERY = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD8U_0c7onksP9cLNGZ6S_A2Vvr3zXeVnagQf0W87GmofGNpnMPosze65EZHVpO2L7YPm2gUjXjqCwz77RwFIX5mNL-JYnTRKmx2JwXe1xB6UkQ67aNDnNx0hNHVRJ-FCv9L6Zsv58LC4WpfvyNblburN-tGItFHPk7PZl4GvVjm3XtqL6mzIj_wlGPi3Gbt6BfSDinss09iFPTa5ctZdryknJN0_vFperc6uSetX9DKsN8nQjlyC6XKWi9KfRT7HAxNLrnGMVpDCU',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQCsm5iCgtAQueSVQmst-pbiF0iZjYhv3XlQ0H7wYjiiU8tH3C_wRL0y-U1YyYlkFhkHx1HM8aqYa_H1qWa98Ef1IVRpFvnwouQzS4C1WdrTnpJM7plrx7r4LiJIo4l4cD1_SfuWKTP0ity-FWCM-oCYZyO1uy34d06JTCkLspdovS2xfYrBuuw-IRqHK8Kdkh3nrD7yTb3n0B5X32VJOgFQ-EMKEscqhOCICoWO5sRwFCB-PuglwvdlqE99QmkWBNTbUhEZy3-48',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCKdtnDIpUSwZ34kjDYieuzfTk5txulcozgiPO93Ik3wgHBqzidGLp3ZMbgXpxAFVzPT2pycVsVk6JVMWO8JYwcOBYlaB9gZtkpDfdq-1IBKRDkcwRwPwE-6iW1bg-7GyE80tErhSHElq8fe3JqBG4pmO9h9yoYdlhQh-iBDMylNV6qxb_xzQ8m5_zGTb5gZfRfYDz5t1cTGlGPxlZHFCps_ClIImQ5tMq9B5Vu6aFiyZ2y3SEiZMnX4F6n4MGqY6i48uIcibfOu5s',
];

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.user.profile);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedBio, setEditedBio] = React.useState(profile?.bio || '');

  if (!profile) {
    return (
      <View className="flex-1 bg-background-dark items-center justify-center">
        <Text className="text-white font-display">Loading profile...</Text>
      </View>
    );
  }

  const calculateAge = (birthday?: string) => {
    if (!birthday) return 24;
    const birthDate = new Date(birthday);
    let age = new Date().getFullYear() - birthDate.getFullYear();
    const m = new Date().getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && new Date().getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  React.useEffect(() => {
    const syncProfile = async () => {
      try {
        const response = await userService.getProfile();
        dispatch(updateProfile(response.data.profile));
      } catch (err) {
        console.error('Profile Sync Error:', err);
      }
    };
    syncProfile();
  }, []);

  const handleSaveBio = async () => {
    if (!editedBio.trim()) return;
    try {
      await userService.updateProfile({ bio: editedBio });
      dispatch(updateProfile({ bio: editedBio }));
      setIsEditing(false);
    } catch (err) {
      console.error('Save Bio Error:', err);
    }
  };

  return (
    <View className="flex-1 bg-background-dark">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Banner Section */}
        <View className="relative h-64 w-full">
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaa-1JlUYIassaRd0e0bO3RZdRyQOuACdWfrrGwyJlLWMLiD0A1lic2Xzx3cGZhEbHoraGoYalt7u8MoUxBRZWF0PC8Ve3U4oUM9jwe2ywWhKhE2bG-PeYHOhDC-aFfAXrcm9qjyZ3plK5uiZKOYqWdnVlrrcKBPmS4M-4RZ34rrhN98Tw7QURJEwqiLz_LMNh2BTq943bx2ukmbmGjRP2nSaHy5b8GkI-VK3jYki887k0eWI4VPDwoFBkHQVeHMCAORctP5fl6JI' }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(15, 23, 42, 0.4)', 'rgba(15, 23, 42, 0.95)']}
            className="absolute inset-0"
          />

          <SafeAreaView className="absolute inset-x-0 top-0">
            <View className="flex-row items-center justify-between p-4">
              <TouchableOpacity className="size-10 rounded-full bg-white/10 items-center justify-center border border-white/10">
                <ArrowLeft size={20} stroke="white" />
              </TouchableOpacity>
              <View className="flex-row gap-2">
                <TouchableOpacity className="size-10 rounded-full bg-white/10 items-center justify-center border border-white/10">
                  <Share2 size={20} stroke="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push('/settings')}
                  className="size-10 rounded-full bg-white/10 items-center justify-center border border-white/10"
                >
                  <Settings size={20} stroke="white" />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>

        {/* Profile Header */}
        <View className="relative z-30 -mt-20 items-center px-4">
          <View className="relative">
            <View className="size-36 rounded-full border-4 border-background-dark overflow-hidden shadow-2xl">
              <Image
                source={{ uri: profile.images[0]?.url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2' }}
                className="w-full h-full"
              />
            </View>
            <View className="absolute bottom-2 right-2 size-6 bg-green-500 border-4 border-background-dark rounded-full" />
          </View>

          <View className="mt-4 items-center">
            <View className="flex-row items-center gap-2">
              <Text className="text-3xl font-display-extrabold text-white">{profile.name}, {calculateAge(profile.birthDate)}</Text>
              {profile.isGold ? (
                <View className="bg-yellow-500 px-2 py-0.5 rounded-md">
                  <Text className="text-slate-900 text-[10px] font-display-black uppercase">Gold</Text>
                </View>
              ) : (
                <Award size={20} stroke="#60a5fa" fill="#60a5fa" />
              )}
            </View>
            <View className="flex-row items-center gap-1 mt-1">
              <MapPin size={14} stroke="#94a3b8" />
              <Text className="text-slate-400 font-display">New York, NY</Text>
            </View>
          </View>

          <View className="flex-row gap-3 mt-8 w-full">
            <TouchableOpacity className="flex-1 overflow-hidden rounded-2xl">
              <LinearGradient
                colors={['#ff4255', '#a855f7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="py-4 items-center justify-center shadow-lg shadow-primary/20"
              >
                <Text className="text-white font-display-bold text-lg">Edit Profile</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity className="px-5 py-4 rounded-2xl bg-slate-800/10 border border-white/5 items-center justify-center">
              <MoreHorizontal size={24} stroke="#ff4255" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Row */}
        <View className="flex-row justify-around mt-10 mx-4 p-5 rounded-3xl bg-slate-800/10 border border-white/5">
          <View className="items-center">
            <Text className="text-xl font-display-extrabold text-white">84%</Text>
            <Text className="text-[10px] text-slate-500 font-display-bold uppercase tracking-widest mt-1">Match</Text>
          </View>
          <View className="w-[1px] bg-primary/20" />
          <View className="items-center">
            <Text className="text-xl font-display-extrabold text-white">1.2k</Text>
            <Text className="text-[10px] text-slate-500 font-display-bold uppercase tracking-widest mt-1">Likes</Text>
          </View>
          <View className="w-[1px] bg-primary/20" />
          <View className="items-center">
            <Text className="text-xl font-display-extrabold text-white">12</Text>
            <Text className="text-[10px] text-slate-500 font-display-bold uppercase tracking-widest mt-1">Photos</Text>
          </View>
        </View>

        {/* Premium Banner */}
        <TouchableOpacity
          onPress={() => router.push('/premium')}
          className="mx-4 mt-6 h-32 rounded-3xl overflow-hidden shadow-2xl shadow-yellow-500/20"
        >
          <LinearGradient
            colors={profile.isGold ? ['#1E293B', '#334155'] : ['#EAB308', '#A855F7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-1 p-6 flex-row items-center justify-between"
          >
            <View className="flex-1">
              <View className="flex-row items-center gap-2 mb-2">
                <Star size={18} stroke="white" fill={profile.isGold ? "transparent" : "white"} />
                <Text className="text-white font-display-extrabold text-xl">
                  {profile.isGold ? 'HeartBeat Gold Member' : 'HeartBeat Gold'}
                </Text>
              </View>
              <Text className="text-white/90 font-display-medium text-sm">
                {profile.isGold ? 'Manage your gold subscription features' : 'See who likes you and get unlimited likes!'}
              </Text>
            </View>
            <View className="size-16 rounded-2xl bg-white/20 items-center justify-center border border-white/30 backdrop-blur-md">
              <Zap size={32} stroke="white" fill="white" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Sections */}
        <View className="px-6 py-10 gap-10">
          {/* About */}
          <View>
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-2">
                <Sparkles size={18} stroke="#ff4255" />
                <Text className="text-lg font-display-bold text-white">About Me</Text>
              </View>
              <TouchableOpacity onPress={() => {
                if (isEditing) handleSaveBio();
                else setIsEditing(true);
              }}>
                <Text className="text-primary font-display-bold text-sm">
                  {isEditing ? 'Save' : 'Edit'}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="p-4 rounded-2xl bg-slate-800/10 border border-white/5">
              {isEditing ? (
                <TextInput
                  value={editedBio}
                  onChangeText={setEditedBio}
                  multiline
                  className="text-slate-300 leading-relaxed font-display"
                  placeholder="Tell us about yourself..."
                  placeholderTextColor="#64748b"
                />
              ) : (
                <Text className="text-slate-300 leading-relaxed font-display">
                  {profile.bio || "No bio yet. Tell the world about yourself!"}
                </Text>
              )}
            </View>
          </View>

          {/* Interests */}
          <View>
            <Text className="text-lg font-display-bold text-white mb-4">Interests</Text>
            <View className="flex-row flex-wrap gap-2.5">
              {profile.interests.map((item) => (
                <View key={item.id} className="px-4 py-2 rounded-full bg-slate-800/10 border border-primary/20">
                  <Text className="text-slate-200 text-xs font-display-semibold">{item.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Gallery */}
          <View className="pb-20">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-display-bold text-white">Photo Gallery</Text>
              <Text className="text-primary text-sm font-display-bold">View All</Text>
            </View>
            <View className="flex-row gap-2.5">
              {profile.images.slice(0, 3).map((img, i) => (
                <View key={i} className="flex-1 aspect-square rounded-2xl overflow-hidden shadow-sm">
                  <Image source={{ uri: img.url }} className="w-full h-full" />
                </View>
              ))}
              {profile.images.length > 3 && (
                <TouchableOpacity className="flex-1 aspect-square rounded-2xl bg-primary/20 border border-primary/40 items-center justify-center">
                  <Text className="text-primary font-display-bold text-lg">+{profile.images.length - 3}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
