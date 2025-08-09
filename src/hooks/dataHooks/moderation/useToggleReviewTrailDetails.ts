import { useMutation, useQueryClient } from '@tanstack/react-query';

import { trailReviewApi } from '../../../api/moderation';
import { handleApiError } from '../../../utils/errorHandlers';

export const useToggleReviewTrailDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['toggleReviewTrailDetails'],
    mutationFn: ({ trailId, shouldClaim }: { trailId: string; shouldClaim: boolean }) => {
      return shouldClaim
        ? trailReviewApi.claimForReviewTrailDetails(trailId)
        : trailReviewApi.unclaimForReviewTrailDetails(trailId);
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['getTrailReviewer', variables.trailId] });
    },

    onError: handleApiError,
  });
};
