import { useQuery } from '@tanstack/react-query';
import { trailsApi } from '../../../api/trailsApi';

export const useTrail = (trailId: string) => {
  return useQuery({
    queryKey: ['trail', trailId],
    queryFn: () => trailsApi.getTrail(trailId),
    refetchOnMount: false, // Only fetch on hard reloads
    refetchOnWindowFocus: false, // Optional: prevent refetch on tab switch
    refetchOnReconnect: false, // Optional: also disable on network recovery
    staleTime: 60 * 60 * 1000, // 60min
  });
};
