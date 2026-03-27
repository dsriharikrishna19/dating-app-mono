import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CallStatus = 'idle' | 'ringing' | 'calling' | 'connected' | 'ended';

interface CallState {
  status: CallStatus;
  matchId: string | null;
  otherUser: {
    id: string;
    name: string;
    image?: string;
  } | null;
  isAudioMuted: boolean;
  isVideoMuted: boolean;
  error: string | null;
}

const initialState: CallState = {
  status: 'idle',
  matchId: null,
  otherUser: null,
  isAudioMuted: false,
  isVideoMuted: false,
  error: null,
};

const callSlice = createSlice({
  name: 'call',
  initialState,
  reducers: {
    initiateCall: (state, action: PayloadAction<{ matchId: string; otherUser: any }>) => {
      state.status = 'calling';
      state.matchId = action.payload.matchId;
      state.otherUser = action.payload.otherUser;
    },
    receiveCall: (state, action: PayloadAction<{ matchId: string; otherUser: any }>) => {
      state.status = 'ringing';
      state.matchId = action.payload.matchId;
      state.otherUser = action.payload.otherUser;
    },
    acceptCall: (state) => {
      state.status = 'connected';
    },
    endCall: (state) => {
      state.status = 'ended';
      // We will reset to idle after a short timeout in the UI
    },
    resetCall: (state) => {
      return initialState;
    },
    toggleAudio: (state) => {
      state.isAudioMuted = !state.isAudioMuted;
    },
    toggleVideo: (state) => {
      state.isVideoMuted = !state.isVideoMuted;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  initiateCall, 
  receiveCall, 
  acceptCall, 
  endCall, 
  resetCall, 
  toggleAudio, 
  toggleVideo,
  setError 
} = callSlice.actions;

export default callSlice.reducer;
