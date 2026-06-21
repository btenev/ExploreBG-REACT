import { useQuery } from "@tanstack/react-query";

import { trailsApi } from "@api/public";

export const useAvailableTrails = (enabled: boolean) =>
  useQuery({
    queryKey: ["availableTrails"],
    queryFn: trailsApi.getAvailableTrails,
    enabled,
    refetchOnMount: false, // Only fetch on hard reloads
    refetchOnWindowFocus: false, // Optional: prevent refetch on tab switch
    refetchOnReconnect: false, // Optional: also disable on network recovery
    staleTime: 60 * 60 * 1000, // 60min
  });
