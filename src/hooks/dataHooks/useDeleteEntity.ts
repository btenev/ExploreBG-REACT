import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-toastify';

import { BasicDeleteParams } from '../../types/shared/delete';
import { EntityType } from '../../types';
import { trailsApi } from '../../api/trailsApi';

import { capitalize } from '../../utils/mixedUtils';
import { handleApiError } from '../../utils/errorHandlers';

export const useDeleteEntity = (setStateValue: Dispatch<SetStateAction<boolean>>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const apiMapper: Record<EntityType, (params: BasicDeleteParams) => Promise<void>> = {
    trail: ({ entityId }) => trailsApi.deleteTrail(entityId),
    accommodation: async () => console.log('Accommodation delete not implemented yet'), // Placeholder for accommodation delete;
    destination: async () => console.log('Destination delete not implemented yet'), // Placeholder for destination delete;
  };

  return useMutation({
    mutationFn: (params: BasicDeleteParams) => apiMapper[params.entity](params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [variables.entity] });
      setStateValue(false);
      toast.success(`${capitalize(variables.entity)} deleted successfully.`);
      navigate('users/my-profile');
    },
    onError: handleApiError,
  });
};
