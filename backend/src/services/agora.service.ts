import pkg from 'agora-token';
const { RtcTokenBuilder, RtcRole } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const APP_ID = process.env.AGORA_APP_ID || '';
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE || '';

export class AgoraService {
  static generateRtcToken(channelName: string, uid: number, role: number = RtcRole.PUBLISHER) {
    if (!APP_ID || !APP_CERTIFICATE) {
      throw new Error('AGORA_APP_ID or AGORA_APP_CERTIFICATE is not defined in .env');
    }

    const expirationTimeInSeconds = 3600 * 24; // 24 hours
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const token = RtcTokenBuilder.buildTokenWithUid(
      APP_ID,
      APP_CERTIFICATE,
      channelName,
      uid,
      role,
      privilegeExpiredTs,
      privilegeExpiredTs
    );

    return {
      token,
      appId: APP_ID,
      expiresAt: privilegeExpiredTs
    };
  }
}
