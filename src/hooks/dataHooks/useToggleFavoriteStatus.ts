import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import { trailsApi } from '../../api/trailsApi';
import { accommodationsApi } from '../../api/accommodationsApi';
import { destinationsApi } from '../../api/destinationsApi';
import { handleApiError } from '../../utils/errorHandlers';
import { ToggleFavoriteRequest, ToggleFavoriteResponse } from '../../types';

type EntityType = 'trail' | 'accommodation' | 'destination';

type LikeParams = { id: string; entity: EntityType; data: ToggleFavoriteRequest };

export const useToggleFavoriteStatus = (setIsLiked: Dispatch<SetStateAction<boolean>>) => {
  const apiMapper: Record<
    EntityType,
    (id: string, data: ToggleFavoriteRequest) => Promise<ToggleFavoriteResponse>
  > = {
    trail: (id, data) => trailsApi.toggleFavoriteStatus(id, data),
    accommodation: (id, data) => accommodationsApi.toggleFavoriteStatus(id, data),
    destination: (id, data) => destinationsApi.toggleFavoriteStatus(id, data),
  };

  return useMutation({
    mutationFn: ({ id, entity, data }: LikeParams) => apiMapper[entity](id, data),
    onSuccess: ({ like }) => {
      setIsLiked(like);
      toast.success(
        like ? 'Added to favorites successfully.' : 'Removed from favorites successfully.'
      );
    },
    onError: handleApiError,
  });
};
