import { useQuery } from "@tanstack/react-query";

import { trailReviewApi } from "@api/moderation";

export const useGetCreatedTrailForReview = (
  trailId: string | null,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ["getCreatedTrailForReview", trailId],
    queryFn: () => {
      return trailReviewApi.getCreatedTrailForReview(trailId as string);
    },
    enabled: Boolean(enabled && trailId),
  });
};

//TODO: Global on error
