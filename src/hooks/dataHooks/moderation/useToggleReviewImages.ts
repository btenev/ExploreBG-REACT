import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  accommodationReviewApi,
  destinationReviewApi,
  trailReviewApi,
} from '../../../api/moderation';

import { EntityType } from '../../../types';
import { handleApiError } from '../../../utils/errorHandlers';

export const useToggleReviewImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['toggleReviewImages'],
    mutationFn: ({
      entityId,
      imageId,
      entityType,
      shouldClaim,
    }: {
      entityId: string;
      imageId: string;
      entityType: EntityType;
      shouldClaim: boolean;
    }) => {
      switch (entityType) {
        case 'trail':
          return shouldClaim
            ? trailReviewApi.claimForReviewTrailImages(entityId)
            : trailReviewApi.unclaimForReviewTrailImages(entityId);
        case 'accommodation':
          return shouldClaim
            ? accommodationReviewApi.claimForReviewAccommodationImages(entityId)
            : accommodationReviewApi.unclaimForReviewAccommodationImages(entityId);
        case 'destination':
          return shouldClaim
            ? destinationReviewApi.claimForReviewDestinationImages(entityId)
            : destinationReviewApi.unclaimForReviewDestinationImages(entityId);
        default:
          throw new Error(`Unsupported entity type: ${entityType}`);
      }
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['getImageReviewer', variables.imageId] });

      toast.success(
        variables.shouldClaim
          ? `Images successfully claimed for review.`
          : 'Image review claim removed.'
      );
    },

    onError: handleApiError,
  });
};
