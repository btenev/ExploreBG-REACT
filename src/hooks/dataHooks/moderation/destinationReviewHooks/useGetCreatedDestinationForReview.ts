import { useQuery } from "@tanstack/react-query";

import { destinationReviewApi } from "@api/moderation";

export const useGetCreatedDestinationForReview = (
  destinationId: string | null,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: ["getCreatedDestinationForReview", destinationId],
    queryFn: () => {
      return destinationReviewApi.getCreatedDestinationForReview(
        destinationId as string,
      );
    },
    enabled: Boolean(enabled && destinationId),
  });
};

//TODO: Global on error
