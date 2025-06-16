import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

import { toast } from 'react-toastify';

import { EntityType, IComment } from '../../types';
import { ExtendedDeleteParams } from '../../types/shared/delete';

import { accommodationsApi } from '../../api/accommodationsApi';
import { destinationsApi } from '../../api/destinationsApi';
import { trailsApi } from '../../api/trailsApi';

import { handleApiError } from '../../utils/errorHandlers';

export const useDeleteComment = (setComments: Dispatch<SetStateAction<IComment[]>>) => {
  const queryClient = useQueryClient();

  const apiMapper: Record<EntityType, (params: ExtendedDeleteParams) => Promise<void>> = {
    trail: ({ entityId, secondaryId }) => trailsApi.deleteTrailComment(entityId, secondaryId),
    accommodation: ({ entityId, secondaryId }) =>
      accommodationsApi.deleteAccommodationComment(entityId, secondaryId),
    destination: ({ entityId, secondaryId }) =>
      destinationsApi.deleteDestinationComment(entityId, secondaryId),
  };

  return useMutation({
    mutationKey: ['deleteComment'],
    mutationFn: (params: ExtendedDeleteParams) => apiMapper[params.entity](params),
    onSuccess: (_data, variables) => {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== Number(variables.secondaryId))
      );

      queryClient.invalidateQueries({
        queryKey: ['comments', variables.entity, variables.entityId],
      });

      toast.success('Comment deleted successfully.');
    },
    onError: handleApiError,
  });
};
