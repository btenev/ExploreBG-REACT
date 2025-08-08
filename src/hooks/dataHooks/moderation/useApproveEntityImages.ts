import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { EntityType, ReviewStatusEnum } from '../../../types';
import {
  accommodationReviewApi,
  destinationReviewApi,
  trailReviewApi,
} from '../../../api/moderation';
import { handleApiError } from '../../../utils/errorHandlers';

export const useApproveEntityImages = () => {
  const navigate = useNavigate();

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

    onSuccess: (data, variables) => {
      if (data.entityStatus === ReviewStatusEnum.approved) {
        navigate('/moderation/waiting-approval/count');
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
