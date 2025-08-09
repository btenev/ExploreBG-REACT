import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { trailReviewApi } from '../../../api/moderation';
import { CreateTrailDto } from '../../../schemas';
import { ReviewStatusEnum } from '../../../types/shared/enums/ReviewStatusEnum';
import { handleApiError } from '../../../utils/errorHandlers';

export const useApproveTrail = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['approveTrail'],
    mutationFn: ({ trailData, trailId }: { trailData: CreateTrailDto; trailId: string }) =>
      trailReviewApi.approveTrailDetails(trailId, trailData),

    onSuccess: (data) => {
      if (data.trailStatus === ReviewStatusEnum.approved) {
        navigate(`/moderation/waiting-aproval/count`); // Redirect to the trail's page after approval
      }
      toast.success(`Trail approved successfully!`);
    },

    onError: handleApiError,
  });
};
