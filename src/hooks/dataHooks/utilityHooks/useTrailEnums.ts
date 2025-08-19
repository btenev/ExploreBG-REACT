import { useQuery } from '@tanstack/react-query';
import { utilitiesApi } from '../../../api/utilitiesApi';

export const useTrailEnums = (enabled: boolean) => {
  return useQuery({
    queryKey: ['trailEnums'],
    queryFn: () => utilitiesApi.getTrailEnums(),
    enabled,
    refetchOnMount: false, // Only fetch on hard reloads
    refetchOnWindowFocus: false, // Optional: prevent refetch on tab switch
    refetchOnReconnect: false, // Optional: also disable on network recovery
    staleTime: 60 * 60 * 1000, // 60min
  });
};
