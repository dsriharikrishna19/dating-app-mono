import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

interface Match {
  id: string;
  user: {
    id: string;
    name: string;
    images: Array<{ url: string }>;
  };
  lastMessage?: Message;
  unreadCountCount?: number;
}

interface Conversation {
  matchId: string;
  otherUser: {
    id: string;
    name: string;
    images: Array<{ url: string }>;
  };
  lastMessage?: Message;
  unreadCount: number;
}

interface ChatState {
  matches: Match[];
  conversations: Conversation[];
  activeMatchId: string | null;
  messages: Record<string, Message[]>;
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  matches: [],
  conversations: [],
  activeMatchId: null,
  messages: {},
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMatches: (state, action: PayloadAction<Match[]>) => {
      state.matches = action.payload;
    },
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },
    setActiveMatch: (state, action: PayloadAction<string | null>) => {
      state.activeMatchId = action.payload;
    },
    setMessages: (state, action: PayloadAction<{ matchId: string; messages: Message[] }>) => {
      const { matchId, messages } = action.payload;
      state.messages[matchId] = messages;
    },
    addMessage: (state, action: PayloadAction<{ matchId: string; message: Message }>) => {
      const { matchId, message } = action.payload;
      if (!state.messages[matchId]) {
        state.messages[matchId] = [];
      }
      state.messages[matchId].push(message);
      
      // Update last message in conversation list
      const conversation = state.conversations.find(c => c.matchId === matchId);
      if (conversation) {
        conversation.lastMessage = message;
        if (state.activeMatchId !== matchId) {
          conversation.unreadCount += 1;
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearChat: (state) => {
      state.matches = [];
      state.messages = {};
      state.activeMatchId = null;
    },
  },
});

export const { setMatches, setConversations, setActiveMatch, setMessages, addMessage, setLoading, setError, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
