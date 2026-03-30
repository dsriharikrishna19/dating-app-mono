import { AgoraService } from '../services/agora.service.js';
export class AgoraController {
    static async getToken(req, res) {
        try {
            const { channelName, uid } = req.query;
            if (!channelName) {
                return res.status(400).json({ error: 'channelName is required' });
            }
            // Default to 0 (let Agora assign) or parse from query
            const userUid = uid ? parseInt(uid) : 0;
            const tokenData = AgoraService.generateRtcToken(channelName, userUid);
            return res.json(tokenData);
        }
        catch (error) {
            console.error('Agora Token Generation Error:', error);
            return res.status(500).json({ error: error.message });
        }
    }
}
