import { useQuery } from '@tanstack/react-query';
import { trailReviewApi } from '../../../api/moderation';

export const useGetTrailReviewer = (trailId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['getTrailReviewer', trailId],
    queryFn: () => trailReviewApi.getTrailReviewer(trailId),
    enabled, // Ensure the query runs only if trailId is provided
    staleTime: 0,
    gcTime: 0,
    retry: false, // Disable retries on failure
  });
};
