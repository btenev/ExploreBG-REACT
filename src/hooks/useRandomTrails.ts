import { useQuery } from '@tanstack/react-query';
import { trailsApi } from '../api/trailsApi';

export const useRandomTrails = (token?: string) => {
  return useQuery({
    queryKey: ['randomTrails'],
    queryFn: () => trailsApi.get4RandomTrails(token),
    refetchOnMount: false, // Only fetch on hard reloads
    refetchOnWindowFocus: false, // Optional: prevent refetch on tab switch
    refetchOnReconnect: false, // Optional: also disable on network recovery
    staleTime: 60 * 60 * 1000, // 60min
  });
};
