import { useQuery } from "@tanstack/react-query";

import { usersApi } from "@api/public";

export const useGetUserProfile = (userId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => usersApi.getUserProfile(userId),
    enabled,
  });
};
