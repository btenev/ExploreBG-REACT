import { Dispatch } from 'react';
import { useMutation } from '@tanstack/react-query';

import { toast } from 'react-toastify';

import { CommentDataDto } from '../formHooks/useCommentForm';
import { EntityType, IComment } from '../../types';

import { trailsApi } from '../../api/trailsApi';
import { accommodationsApi } from '../../api/accommodationsApi';
import { destinationsApi } from '../../api/destinationsApi';

import { handleApiError } from '../../utils/errorHandlers';

export const useCreateComment = (handleNewComment: Dispatch<IComment>) => {
  const apiMapper: Record<
    EntityType,
    (entityId: string, data: CommentDataDto) => Promise<IComment>
  > = {
    trail: (entityId, data) => trailsApi.createTrailComment(entityId, data),
    accommodation: (entityId, data) => accommodationsApi.createAccommodationComment(entityId, data),
    destination: (entityId, data) => destinationsApi.createDestinationComment(entityId, data),
  };

  return useMutation({
    mutationKey: ['createComment'],
    mutationFn: ({
      entityId,
      entity,
      data,
    }: {
      entityId: string;
      entity: EntityType;
      data: CommentDataDto;
    }) => apiMapper[entity](entityId, data),
    onSuccess: (data) => {
      if (!data) {
        toast.error('Failed to create comment.');
        return;
      }
      handleNewComment(data);
      toast.success('Comment created successfully.');
    },
    onError: handleApiError,
  });
};
