import { useQuery } from "@tanstack/react-query";

import { destinationsApi } from "@api/public";

export const useGetDestination = (destinationId: string) => {
  return useQuery({
    queryKey: ["destination", destinationId],
    queryFn: () => destinationsApi.getDestination(destinationId),
    refetchOnMount: false, // Only fetch on hard reloads
    refetchOnWindowFocus: false, // Optional: prevent refetch on tab switch
    refetchOnReconnect: false, // Optional: also disable on network recovery
    staleTime: 60 * 60 * 1000, // 60min
  });
};
