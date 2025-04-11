import { useQuery } from '@tanstack/react-query';

import { usersApi } from '../api/usersApi';

export const useMyProfile = () => {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: () => usersApi.getMyProfile(),
    refetchOnMount: false, // Only fetch on hard reloads
    refetchOnWindowFocus: false, // Optional: prevent refetch on tab switch
    refetchOnReconnect: false, // Optional: also disable on network recovery
    staleTime: 60 * 60 * 1000, // 60min
  });
};
