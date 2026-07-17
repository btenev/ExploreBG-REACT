import { useQuery } from "@tanstack/react-query";

import { accommodationReviewApi } from "@api/moderation";

export const useGetCreatedAccommodationForReview = (
  accommodationId: string | null,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: ["getCreatedAccommodationForReview", accommodationId],
    queryFn: () => {
      return accommodationReviewApi.getCreatedAccommodationForReview(
        accommodationId as string,
      );
    },
    enabled: Boolean(enabled && accommodationId),
  });
};

//TODO: Global on error
