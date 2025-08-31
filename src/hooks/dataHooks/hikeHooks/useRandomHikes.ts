import { useQuery } from "@tanstack/react-query";

import { hikesApi } from "@api/public";

export const useRandomHikes = () => {
  return useQuery({
    queryKey: ["randomHikes"],
    queryFn: () => hikesApi.get4RandomHikes(),
    refetchOnMount: false, // Only fetch on hard reloads
    refetchOnWindowFocus: false, // Optional: prevent refetch on tab switch
    refetchOnReconnect: false, // Optional: also disable on network recovery
    staleTime: 60 * 60 * 1000, // 60min
  });
};
