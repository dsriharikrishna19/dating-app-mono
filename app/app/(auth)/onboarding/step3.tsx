import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, Dimensions, ActivityIndicator, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, Plus, Camera } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateProfile } from '../../../store/slices/userSlice';
import * as ImagePicker from 'expo-image-picker';
import { HttpService } from '../../../services/api';

const { width } = Dimensions.get('window');
const GRID_SIZE = (width - 64 - 16) / 3;

export default function OnboardingStep3() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.user.profile);
  
  const [images, setImages] = React.useState<any[]>(profile?.images || []);
  const [uploading, setUploading] = React.useState(false);

  const handleNext = () => {
    dispatch(updateProfile({ images: images.map(img => img.url) }));
    router.push('/onboarding/step4');
  };

  const handleAddPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setUploading(true);
      
      try {
        const formData = new FormData();
        
        if (Platform.OS === 'web') {
          // On web, we need to convert the URI to a Blob
          const response = await fetch(asset.uri);
          const blob = await response.blob();
          formData.append('image', blob, asset.fileName || 'upload.jpg');
        } else {
          // On mobile, we use the standard object format
          // @ts-ignore
          formData.append('image', {
            uri: asset.uri,
            name: asset.fileName || 'upload.jpg',
            type: asset.mimeType || 'image/jpeg',
          });
        }

        const response = await HttpService.postMultipart('/upload', formData);
        
        if (response.data.success) {
          const newImage = { 
            id: Math.random().toString(), 
            url: response.data.data.publicUrl, 
            isPrimary: images.length === 0 
          };
          const nextImages = [...images, newImage];
          setImages(nextImages);
          dispatch(updateProfile({ images: nextImages.map(img => img.url) }));
        }
      } catch (error: any) {
        console.error('Upload Error:', error.message);
        alert('Failed to upload image. Please try again.');
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <View className="flex-1 bg-background-dark p-4">
      <Stack.Screen options={{
        headerTitle: '',
        headerTransparent: true,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} className="ml-2 p-2">
            <ArrowLeft size={24} stroke="white" />
          </TouchableOpacity>
        )
      }} />

      <SafeAreaView className="flex-1 px-8 pt-20">
        <View className="mb-12">
          <View className="flex-row gap-2 mb-4">
            <View className="h-1 flex-1 bg-primary rounded-full" />
            <View className="h-1 flex-1 bg-primary rounded-full" />
            <View className="h-1 flex-1 bg-primary rounded-full transition-all duration-300" />
            <View className="h-1 flex-1 bg-slate-800 rounded-full" />
          </View>
          <View className="flex-row items-center gap-3 mb-4">
            <Text className="text-white text-4xl font-display-bold">Add Photos</Text>
            <Camera size={28} stroke="#FF4458" />
          </View>
          <Text className="text-slate-400 text-lg font-display">Show the world the real you</Text>
        </View>

        <View className="flex-row flex-wrap gap-4">
          <View 
            style={{ width: GRID_SIZE * 2 + 16, height: GRID_SIZE * 2 + 16 }} 
            className="bg-slate-800/50 border-2 border-dashed border-primary/40 rounded-3xl items-center justify-center overflow-hidden"
          >
            {images[0] ? (
              <Image source={{ uri: images[0].url }} className="w-full h-full" />
            ) : (
              <Camera size={48} stroke="#64748b" />
            )}
            <TouchableOpacity 
              onPress={handleAddPhoto}
              className="absolute bottom-4 right-4 size-10 bg-primary rounded-full items-center justify-center shadow-lg"
            >
              <Plus size={24} stroke="white" />
            </TouchableOpacity>
          </View>

          {[1, 2, 3, 4, 5].map((i) => (
            <TouchableOpacity 
              key={i}
              onPress={handleAddPhoto}
              style={{ width: GRID_SIZE, height: GRID_SIZE }}
              className="bg-slate-800/50 border-2 border-dashed border-slate-700/50 rounded-2xl items-center justify-center overflow-hidden"
            >
              {images[i] ? (
                <Image source={{ uri: images[i].url }} className="w-full h-full" />
              ) : (
                <Plus size={20} stroke="#64748b" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          className={`w-full h-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 mt-auto mb-10 ${uploading ? 'opacity-70' : ''}`}
          onPress={handleNext}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-lg font-display-bold">Next</Text>
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
