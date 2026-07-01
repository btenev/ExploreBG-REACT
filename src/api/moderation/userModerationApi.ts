import { API_ROUTES } from "@constants";
import { IUser } from "@types";

import { ApiClient } from "../base";

const apiClient = new ApiClient();

export const userModerationApi = {
  getAllUsers: (): Promise<IUser[]> =>
    apiClient.get(API_ROUTES.moderation.user.getAll),

  lockUnlockUserAccount: (
    userId: string,
    lockAccount: boolean,
  ): Promise<{ accountNonLocked: boolean }> =>
    apiClient.patch(API_ROUTES.moderation.user.lockUnlockAccount(userId), {
      lockAccount,
    }),

  updateUserRole: (
    userId: string,
    moderator: boolean,
  ): Promise<{ moderator: boolean }> =>
    apiClient.patch(API_ROUTES.moderation.user.updateRole(userId), {
      moderator,
    }),
};
