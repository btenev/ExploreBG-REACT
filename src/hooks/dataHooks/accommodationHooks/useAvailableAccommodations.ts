import { useQuery } from '@tanstack/react-query';

import { accommodationsApi } from '../../../api/accommodationsApi';

export const useAvailableAccommodations = (enabled: boolean) =>
  useQuery({
    queryKey: ['availableAccommodations'],
    queryFn: accommodationsApi.getAvailableAccommodations,
    enabled,
    refetchOnMount: false, // Only fetch on hard reloads
    refetchOnWindowFocus: false, // Optional: prevent refetch on tab switch
    refetchOnReconnect: false, // Optional: also disable on network recovery
    staleTime: 60 * 60 * 1000, // 60min
  });
