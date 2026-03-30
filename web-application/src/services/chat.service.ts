import { HttpService } from './api';

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  matchId: string | null;
  otherUser: {
    id: string;
    name: string;
    image: string | null;
  };
  lastMessage: ChatMessage | null;
  updatedAt: string;
}

export const chatService = {
  /**
   * Fetch all conversations for current user.
   */
  getConversations: async (): Promise<Conversation[]> => {
    return (await HttpService.get('/chat/conversations')).data;
  },

  /**
   * Get messages for a specific conversation.
   */
  getMessages: async (conversationId: string): Promise<ChatMessage[]> => {
    return (await HttpService.get(`/chat/${conversationId}/messages`)).data;
  },

  /**
   * Send a message to a conversation.
   */
  sendMessage: async (conversationId: string, content: string): Promise<ChatMessage> => {
    return (await HttpService.post(`/chat/${conversationId}/messages`, { content })).data;
  },

  /**
   * Mark all messages in a conversation as read.
   */
  markAsRead: async (conversationId: string): Promise<void> => {
    await HttpService.put(`/chat/${conversationId}/read`, {});
  },

  /**
   * Delete a conversation.
   */
  deleteConversation: async (conversationId: string): Promise<void> => {
    await HttpService.delete(`/chat/conversations/${conversationId}`);
  }
};
