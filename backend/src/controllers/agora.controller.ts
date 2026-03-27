import { Request, Response } from 'express';
import { AgoraService } from '../services/agora.service.js';

export class AgoraController {
  static async getToken(req: Request, res: Response) {
    try {
      const { channelName, uid } = req.query;

      if (!channelName) {
        return res.status(400).json({ error: 'channelName is required' });
      }

      // Default to 0 (let Agora assign) or parse from query
      const userUid = uid ? parseInt(uid as string) : 0;
      
      const tokenData = AgoraService.generateRtcToken(channelName as string, userUid);
      
      return res.json(tokenData);
    } catch (error: any) {
      console.error('Agora Token Generation Error:', error);
      return res.status(500).json({ error: error.message });
    }
  }
}
