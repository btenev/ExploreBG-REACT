import { useQuery } from '@tanstack/react-query';
import { moderationDashboardApi } from '../../../api/moderation';

export const useGetWaitingApprovalCount = ({ enabled }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['allUsers'],
    queryFn: () => moderationDashboardApi.getWaitingApprovalCount(),
    enabled,
    refetchOnMount: false, // Only fetch on hard reloads
    refetchOnWindowFocus: false, // Optional: prevent refetch on tab switch
    refetchOnReconnect: false, // Optional: also disable on network recovery
    staleTime: 60 * 60 * 1000, // 60min
  });
};
