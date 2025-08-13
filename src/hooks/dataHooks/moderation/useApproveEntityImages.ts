import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ROUTES } from '../../../constants';
import { EntityType, ReviewStatusEnum } from '../../../types';

import {
  accommodationReviewApi,
  destinationReviewApi,
  trailReviewApi,
} from '../../../api/moderation';
import { handleApiError } from '../../../utils/errorHandlers';

export const useApproveEntityImages = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['approveEntityImages'],
    mutationFn: ({
      entityId,
      entityType,
      imageIds,
    }: {
      entityId: string;
      entityType: EntityType;
      imageIds: number[];
    }) => {
      switch (entityType) {
        case 'trail':
          return trailReviewApi.approveTrailImages(entityId, imageIds);
        case 'accommodation':
          return accommodationReviewApi.approveAccommodationImages(entityId, imageIds);
        case 'destination':
          return destinationReviewApi.approveDestinationImages(entityId, imageIds);
        default:
          throw new Error(`Unsupported entity type: ${entityType}`);
      }
    },

    onSuccess: async (data, variables) => {
      queryClient.removeQueries({
        queryKey: ['getImageReviewer', variables.entityId],
        exact: true,
      });

      // Invalidate trail query to refetch latest data from backend
      await queryClient.invalidateQueries({
        queryKey: ['getCreatedTrailForReview', variables.entityId],
      });

      if (data.entityStatus === ReviewStatusEnum.approved) {
        navigate(ROUTES.dashboard);
      }
      toast.success(
        `${variables.imageIds.length} image${
          variables.imageIds.length > 1 ? 's' : ''
        } approved successfully.`
      );
    },

    onError: handleApiError,
  });
};
