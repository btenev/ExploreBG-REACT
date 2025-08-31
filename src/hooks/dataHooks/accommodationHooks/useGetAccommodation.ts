import { useQuery } from "@tanstack/react-query";

import { accommodationsApi } from "@api/public";

export const useGetAccommodation = (accommodationId: string) => {
  return useQuery({
    queryKey: ["accommodation", accommodationId],
    queryFn: () => accommodationsApi.getAccommodation(accommodationId),
    refetchOnMount: false, // Only fetch on hard reloads
    refetchOnWindowFocus: false, // Optional: prevent refetch on tab switch
    refetchOnReconnect: false, // Optional: also disable on network recovery
    staleTime: 60 * 60 * 1000, // 60min
  });
};
