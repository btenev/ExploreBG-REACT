import { useQuery } from "@tanstack/react-query";

import {
  destinationsApi,
  trailsApi,
  accommodationsApi,
  hikesApi,
} from "@api/public";
import { CommentEntityType, IComment } from "@types";

export const useGetEntityComments = (
  entity: CommentEntityType,
  entityId: string
) => {
  const apiMapper: Record<
    CommentEntityType,
    (id: string) => Promise<IComment[]>
  > = {
    trail: trailsApi.getTrailComments,
    accommodation: accommodationsApi.getAccommodationComments,
    destination: destinationsApi.getDestinationComments,
    hike: hikesApi.getHikeComments,
  };

  return useQuery({
    queryKey: ["comments", entity, entityId],
    queryFn: () => apiMapper[entity](entityId),
    refetchOnMount: false, // Only fetch on hard reloads
    refetchOnWindowFocus: false, // Optional: prevent refetch on tab switch
    refetchOnReconnect: false, // Optional: also disable on network recovery
    staleTime: 60 * 60 * 1000,
  });
};
