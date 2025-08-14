import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { trailReviewApi } from '../../../api/moderation';
import { ReviewStatusEnum } from '../../../types/shared/enums/ReviewStatusEnum';
import { ROUTES } from '../../../constants';

export const useApproveGpxFile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['approveGpxFile'],
    mutationFn: ({
      trailId,
      approved,
      gpxId,
    }: {
      trailId: string;
      approved: boolean;
      gpxId: number;
    }) => {
      // Assuming there's an API method to approve a GPX file
      return trailReviewApi.approveTrailGpxFile(trailId, approved);
    },

    onSuccess: async (data, variables) => {
      queryClient.removeQueries({ queryKey: ['getGpxReviewer', variables.gpxId], exact: true });

      // Invalidate trail query to refetch latest data from backend
      await queryClient.invalidateQueries({
        queryKey: ['getCreatedTrailForReview', variables.trailId],
      });

      if (data.entityStatus === ReviewStatusEnum.approved) {
        navigate(ROUTES.moderation.dashboard);
      }
      toast.success('Gpx file approved successfully');
    },
  });
};
