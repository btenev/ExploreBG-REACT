import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { userModerationApi } from "@api/moderation";
import { IUser } from "@types";
import { handleApiError } from "@utils/errorHandlers";

export const useToggleAccountLock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["toggleAccountLock"],

    mutationFn: ({
      userId,
      lockAccount,
    }: {
      userId: string;
      lockAccount: boolean;
    }) => userModerationApi.lockUnlockUserAccount(userId, lockAccount),

    onSuccess: ({ accountNonLocked }, variables) => {
      queryClient.setQueryData<IUser[]>(["allUsers"], (oldUsers) => {
        if (!oldUsers) return [];

        return oldUsers.map((user) =>
          user.id === Number(variables.userId)
            ? { ...user, accountNonLocked: accountNonLocked }
            : user
        );
      });

      toast.success(
        `Successfully ${variables.lockAccount ? "locked" : "unlocked"} the account.`
      );
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },

    onError: handleApiError,
  });
};
