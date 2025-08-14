import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

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

      toast.success(
        variables.shouldClaim
          ? `Trail successfully claimed for review.`
          : 'Trail review claim removed.'
      );
    },

    onError: handleApiError,
  });
};
