import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions, StyleSheet, Alert } from 'react-native';
import { 
  createAgoraRtcEngine, 
  IRtcEngine, 
  ChannelProfileType, 
  ClientRoleType, 
  RtcSurfaceView, 
  RenderModeType 
} from 'react-native-agora';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Mic, MicOff, Video, VideoOff, PhoneOff, RotateCcw } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { AgoraService } from '../services/agora.service';
import { useAppDispatch } from '../store/hooks';
import { endCall, resetCall } from '../store/slices/callSlice';

const { width, height } = Dimensions.get('window');

export default function VideoCallScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { channelName, otherUserName } = useLocalSearchParams<{ channelName: string; otherUserName: string }>();

  const [joined, setJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoDisabled, setIsVideoDisabled] = useState(false);

  const engine = useRef<IRtcEngine | null>(null);

  useEffect(() => {
    initAgora();
    return () => {
      engine.current?.release();
    };
  }, []);

  const initAgora = async () => {
    try {
      engine.current = createAgoraRtcEngine();
      
      // Fetch token from backend
      const tokenData = await AgoraService.getToken(channelName || 'test-channel');
      
      engine.current.initialize({
        appId: tokenData.appId,
        channelProfile: ChannelProfileType.ChannelProfileCommunication,
      });

      engine.current.registerEventHandler({
        onJoinChannelSuccess: (connection, elapsed) => {
          console.log('Successfully joined channel:', connection.channelId);
          setJoined(true);
        },
        onUserJoined: (connection, remoteUid, elapsed) => {
          console.log('Remote user joined:', remoteUid);
          setRemoteUid(remoteUid);
        },
        onUserOffline: (connection, remoteUid, reason) => {
          console.log('Remote user offline:', remoteUid);
          setRemoteUid(0);
        },
        onLeaveChannel: (connection, stats) => {
          console.log('Left channel');
          setJoined(false);
        },
        onError: (err, msg) => {
          console.error('Agora Error:', err, msg);
        }
      });

      engine.current.enableVideo();
      engine.current.startPreview();

      engine.current.joinChannel(
        tokenData.token,
        channelName || 'test-channel',
        0, // Let Agora assign UID
        { clientRoleType: ClientRoleType.ClientRoleBroadcaster }
      );
    } catch (e) {
      console.error('Failed to initialize Agora:', e);
      Alert.alert('Error', 'Could not start video call. Please check your connection.');
      router.back();
    }
  };

  const handleLeave = () => {
    engine.current?.leaveChannel();
    dispatch(endCall());
    dispatch(resetCall());
    router.back();
  };

  const toggleMic = () => {
    const nextMute = !isMuted;
    engine.current?.muteLocalAudioStream(nextMute);
    setIsMuted(nextMute);
  };

  const toggleCamera = () => {
    const nextVideoDisable = !isVideoDisabled;
    engine.current?.enableLocalVideo(!nextVideoDisable);
    setIsVideoDisabled(nextVideoDisable);
  };

  const switchCamera = () => {
    engine.current?.switchCamera();
  };

  return (
    <View style={StyleSheet.absoluteFill} className="bg-black">
      {/* Remote Video (Full Screen) */}
      <View className="flex-1 bg-slate-900">
        {remoteUid !== 0 ? (
          <RtcSurfaceView
            canvas={{ uid: remoteUid }}
            style={StyleSheet.absoluteFill}
            zOrderMediaOverlay={false}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
            <View className="size-24 rounded-full bg-slate-800 items-center justify-center mb-4">
               <Text className="text-white text-3xl font-display-bold">{otherUserName?.[0] || '?'}</Text>
            </View>
            <Text className="text-white text-2xl font-display-bold">{otherUserName || 'Partner'}</Text>
            <Text className="text-slate-400 font-display mt-2">Waiting for partner...</Text>
          </View>
        )}
      </View>

      {/* Local Video (PiP) */}
      {joined && !isVideoDisabled && (
        <View className="absolute top-16 right-6 w-32 h-44 bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <RtcSurfaceView
            canvas={{ uid: 0 }}
            style={StyleSheet.absoluteFill}
            zOrderMediaOverlay={true}
          />
        </View>
      )}

      {/* Controls Overlay */}
      <SafeAreaView className="absolute bottom-12 left-0 right-0 px-8">
        <View className="flex-row justify-between items-center bg-slate-900/80 p-6 rounded-[40px] border border-white/5 backdrop-blur-md">
          <TouchableOpacity 
            onPress={toggleMic}
            className={`size-14 rounded-full items-center justify-center ${isMuted ? 'bg-red-500/20' : 'bg-white/10'}`}
          >
            {isMuted ? <MicOff size={24} stroke="#ef4444" /> : <Mic size={24} stroke="white" />}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={switchCamera}
            className="size-14 rounded-full bg-white/10 items-center justify-center"
          >
            <RotateCcw size={24} stroke="white" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleLeave}
            className="size-20 bg-primary rounded-full items-center justify-center shadow-lg shadow-primary/30"
          >
            <PhoneOff size={32} stroke="white" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={toggleCamera}
            className={`size-14 rounded-full items-center justify-center ${isVideoDisabled ? 'bg-red-500/20' : 'bg-white/10'}`}
          >
            {isVideoDisabled ? <VideoOff size={24} stroke="#ef4444" /> : <Video size={24} stroke="white" />}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
