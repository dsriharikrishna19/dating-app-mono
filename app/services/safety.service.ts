import { HttpService } from './api';
import { monitoring } from './monitoring.service';

export const safetyService = {
  blockUser: async (blockedId: string) => {
    monitoring.trackEvent('user_block_started', { targetId: blockedId });
    return HttpService.post('/safety/block', { blockedId });
  },

  reportUser: async (reportedId: string, reason: string, description?: string) => {
    monitoring.trackEvent('user_report_submitted', { targetId: reportedId, reason });
    return HttpService.post('/safety/report', { reportedId, reason, description });
  },

  getBlockedUsers: async () => {
    monitoring.trackEvent('blocked_list_fetch');
    return HttpService.get('/safety/blocked');
  },

  unblockUser: async (userId: string) => {
    monitoring.trackEvent('user_unblock_started', { targetId: userId });
    return HttpService.delete(`/safety/unblock/${userId}`);
  }
};
