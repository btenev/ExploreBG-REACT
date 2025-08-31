import { useQuery } from "@tanstack/react-query";

import { imageModerationApi } from "@api/moderation";

/**
 * Fetch the reviewer of an image for moderation purposes.
 * Only runs if `enabled` is true (e.g., when imageId is valid).
 */
export const useGetImageReviewer = (imageId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["getImageReviewer", imageId],
    queryFn: () => imageModerationApi.getImageReviewer(imageId),
    enabled, // Ensure the query runs only if trailId is provided
    staleTime: 0,
    gcTime: 0,
    retry: false, // Disable retries on failure
  });
};
