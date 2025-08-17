import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { MODERATION_ROUTES } from '../../../constants';
import { ReviewStatusEnum } from '../../../types/shared';
import { trailReviewApi } from '../../../api/moderation';
import { CreateTrailDto } from '../../../schemas';
import { handleApiError } from '../../../utils/errorHandlers';

export const useApproveTrail = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['approveTrail'],
    mutationFn: ({ trailData, trailId }: { trailData: CreateTrailDto; trailId: string }) =>
      trailReviewApi.approveTrailDetails(trailId, trailData),

    onSuccess: async (data, { trailId }) => {
      // Optimistically update cached trail detailsStatus & entityStatus
      queryClient.setQueryData(['getCreatedTrailForReview', trailId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          detailsStatus: ReviewStatusEnum.approved,
          entityStatus: data.entityStatus ?? old.entityStatus,
        };
      });

      //Remove reviewer data cache to hide claim/review buttons immediately
      console.log('Before removal:', queryClient.getQueryData(['getTrailReviewer', trailId]));
      queryClient.removeQueries({ queryKey: ['getTrailReviewer', trailId], exact: true });
      console.log('After removal:', queryClient.getQueryData(['getTrailReviewer', trailId]));

      toast.success('Trail details approved successfully!');

      // Invalidate trail query to refetch latest data from backend
      await queryClient.invalidateQueries({ queryKey: ['getCreatedTrailForReview', trailId] });

      if (data.entityStatus === ReviewStatusEnum.approved) {
        navigate(MODERATION_ROUTES.dashboard);
      }
    },

    onError: handleApiError,
  });
};
