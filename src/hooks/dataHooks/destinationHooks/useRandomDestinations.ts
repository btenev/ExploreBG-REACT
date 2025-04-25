import { useQuery } from '@tanstack/react-query';
import { destinationsApi } from '../../../api/destinationsApi';

export const useRandomDestinations = () => {
  return useQuery({
    queryKey: ['randomDestination'],
    queryFn: () => destinationsApi.get4RandomDestinations(),
    refetchOnMount: false, // Only fetch on hard reloads
    refetchOnWindowFocus: false, // Optional: prevent refetch on tab switch
    refetchOnReconnect: false, // Optional: also disable on network recovery
    staleTime: 60 * 60 * 1000, // 60min
  });
};
