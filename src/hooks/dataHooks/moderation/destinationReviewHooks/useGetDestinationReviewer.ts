import { useQuery } from "@tanstack/react-query";

import { destinationReviewApi } from "@api/moderation";

export const useGetDestinationReviewer = (
  destinationId: string,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: ["getDestinationReviewer", destinationId],
    queryFn: () => destinationReviewApi.getDestinationReviewer(destinationId),
    enabled, // Ensure the query runs only if destinationId is provided
    staleTime: 0,
    gcTime: 0,
    retry: false, // Disable retries on failure
  });
};
