import { HttpService } from './api';

export const AgoraService = {
  getToken: async (channelName: string, uid: number = 0) => {
    try {
      const response = await HttpService.get('/agora/token', { channelName, uid });
      return response.data;
    } catch (error) {
      console.error('Error fetching Agora token:', error);
      throw error;
    }
  }
};
