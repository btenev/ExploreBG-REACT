import { useQuery } from "@tanstack/react-query";

import { destinationsApi } from "@api/public";

export const useDestinations = (query: string) => {
  return useQuery({
    queryKey: ["destinations", query],
    queryFn: () => destinationsApi.getAllDestinations(query),
    refetchOnMount: false, // Only fetch on hard reloads
    refetchOnWindowFocus: false, // Optional: prevent refetch on tab switch
    refetchOnReconnect: false, // Optional: also disable on network recovery
    staleTime: 60 * 60 * 1000, // 60min
  });
};
