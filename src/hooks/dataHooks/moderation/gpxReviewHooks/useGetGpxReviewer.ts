import { useQuery } from "@tanstack/react-query";

import { gpxReviewApi } from "@api/moderation";

export const useGetGpxReviewer = (gpxId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["getGpxReviewer", gpxId],
    queryFn: () => gpxReviewApi.getGpxReviewer(gpxId),
    enabled,
    staleTime: 0,
    gcTime: 0,
    retry: false, // Disable retries on failure
  });
};
