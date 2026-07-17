import { useQuery } from "@tanstack/react-query";

import { accommodationReviewApi } from "@api/moderation";

export const useGetAccommodationReviewer = (
  accommodationId: string,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: ["getAccommodationReviewer", accommodationId],
    queryFn: () =>
      accommodationReviewApi.getAccommodationReviewer(accommodationId),
    enabled, // Ensure the query runs only if accommodationId is provided
    staleTime: 0,
    gcTime: 0,
    retry: false, // Disable retries on failure
  });
};
