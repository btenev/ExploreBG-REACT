import { useQuery } from '@tanstack/react-query';

import { superUsersApi } from '../../../api/superUsersApi';

export const useGetAllUsers = ({ enabled }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['allUsers'],
    queryFn: () => superUsersApi.getAllUsers(),
    enabled,
    refetchOnMount: false, // Only fetch on hard reloads
    refetchOnWindowFocus: false, // Optional: prevent refetch on tab switch
    refetchOnReconnect: false, // Optional: also disable on network recovery
    staleTime: 60 * 60 * 1000, // 60min
  });
};
