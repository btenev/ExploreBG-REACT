import { IUser } from '../../types';
import { ApiClient } from '../apiClient';

const apiClient = new ApiClient();
const baseUrl = '/moderation';

export const userModerationApi = {
  getAllUsers: (): Promise<IUser[]> => apiClient.get(`${baseUrl}/users`),

  lockUnlockUserAccount: (
    userId: string,
    lockAccount: boolean
  ): Promise<{ accountNonLocked: boolean }> =>
    apiClient.patch(`${baseUrl}/${userId}/lock-account`, { lockAccount }),

  updateUserRole: (userId: string, moderator: boolean): Promise<{ moderator: boolean }> =>
    apiClient.patch(`${baseUrl}/${userId}/update-role`, { moderator }),
};
