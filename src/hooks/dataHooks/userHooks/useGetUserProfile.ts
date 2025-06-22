import { useQuery } from '@tanstack/react-query';

import { usersApi } from '../../../api/usersApi';

export const useGetUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => usersApi.getUserProfile(userId),
  });
};
