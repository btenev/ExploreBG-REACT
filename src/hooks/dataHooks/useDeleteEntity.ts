import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { trailsApi } from '../../api/trailsApi';
import { handleApiError } from '../../utils/errorHandlers';

export type EntityType = 'trail';

type DeleteParams = { id: string; entity: EntityType };

export const useDeleteEntity = (setStateValue: Dispatch<SetStateAction<boolean>>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const apiMapper: Record<EntityType, (id: string) => Promise<void>> = {
    trail: (id) => trailsApi.deleteTrail(id),
  };

  return useMutation({
    mutationFn: ({ id, entity }: DeleteParams) => apiMapper[entity](id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [variables.entity] });
      setStateValue(false);
      navigate('users/my-profile');
    },
    onError: handleApiError,
  });
};
