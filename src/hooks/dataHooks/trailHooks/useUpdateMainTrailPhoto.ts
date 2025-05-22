import { Dispatch } from 'react';
import { useMutation } from '@tanstack/react-query';

import { toast } from 'react-toastify';

import { trailsApi } from '../../../api/trailsApi';
import { PhotosAction } from '../../../context/PhotosContextProvider';
import { handleApiError } from '../../../utils/errorHandlers';

export const useUpdateMainTrailPhoto = (dispatch: Dispatch<PhotosAction>) => {
  return useMutation({
    mutationKey: ['updateMainTrailPhoto'],
    mutationFn: ({ trailId, data }: { trailId: string; data: { imageId: string } }) =>
      trailsApi.updateMainTrailPhoto(trailId, data),
    onSuccess: (data) => {
      if (!data || !data.imageId) {
        toast.error('No photo was uploaded.');
        return;
      }
      dispatch({ type: 'SET_MAIN_PHOTO', payload: data.imageId });

      toast.success('You successfully changed your main photo');
    },
    onError: handleApiError,
  });
};
