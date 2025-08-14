import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { trailReviewApi } from '../../../api/moderation';
import { handleApiError } from '../../../utils/errorHandlers';

export const useToggleReviewGpx = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['toggleReviewGpx'],
    mutationFn: ({
      trailId,
      gpxId,
      shouldClaim,
    }: {
      shouldClaim: boolean;
      gpxId: string;
      trailId: string;
    }) => {
      return shouldClaim
        ? trailReviewApi.claimForReviewTrailGpx(trailId)
        : trailReviewApi.unclaimForReviewTrailGpx(trailId);
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['getGpxReviewer', variables.gpxId] });

      toast.success(
        variables.shouldClaim
          ? `Gpx file successfully claimed for review.`
          : 'Gpx file review claim removed.'
      );
    },

    onError: handleApiError,
  });
};
