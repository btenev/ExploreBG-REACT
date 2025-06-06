import { useQuery } from '@tanstack/react-query';
import { destinationsApi } from '../../../api/destinationsApi';

export const useAvailableDestinations = () => {
  return useQuery({
    queryKey: ['availableDestinations'],
    queryFn: () => destinationsApi.getAvailableDestinations(),
    refetchOnMount: false, // Only fetch on hard reloads
    refetchOnWindowFocus: false, // Optional: prevent refetch on tab switch
    refetchOnReconnect: false, // Optional: also disable on network recovery
    staleTime: 60 * 60 * 1000, // 60min
  });
};
