import { MODERATION_ROUTES } from "@constants";
import { IUser } from "@types";

import { ApiClient } from "../base";

const apiClient = new ApiClient();

export const userModerationApi = {
  getAllUsers: (): Promise<IUser[]> =>
    apiClient.get(MODERATION_ROUTES.user.getAll),

  lockUnlockUserAccount: (
    userId: string,
    lockAccount: boolean
  ): Promise<{ accountNonLocked: boolean }> =>
    apiClient.patch(MODERATION_ROUTES.user.lockUnlockAccount(userId), {
      lockAccount,
    }),

  updateUserRole: (
    userId: string,
    moderator: boolean
  ): Promise<{ moderator: boolean }> =>
    apiClient.patch(MODERATION_ROUTES.user.updateRole(userId), { moderator }),
};
