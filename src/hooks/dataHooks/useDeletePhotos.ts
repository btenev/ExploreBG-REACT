import { Dispatch } from 'react';
import { useMutation } from '@tanstack/react-query';

import { toast } from 'react-toastify';

import { imagesApi } from '../../api/imagesApi';
import { PhotosAction } from '../../context/PhotosContextProvider';
import { handleApiError } from '../../utils/errorHandlers';

export const useDeletePhotos = (dispatch: Dispatch<PhotosAction>) => {
  return useMutation({
    mutationKey: ['delete-photos'],
    mutationFn: ({
      entityId,
      photos,
    }: {
      entityId: string;
      photos: { folder: string; ids: number[] };
    }) => imagesApi.deleteEntityPhotos(entityId, photos),
    onSuccess: (_data, variables) => {
      dispatch({ type: 'DELETE_PHOTOS', payload: variables.photos.ids });

      dispatch({ type: 'SET_PHOTOS_FOR_DELETE', payload: [] });
      dispatch({ type: 'SET_IS_DELETE_PHOTOS_CLICK', payload: false });
      dispatch({ type: 'SET_IS_UPLOADING', payload: false });
      toast.success(
        variables.photos.ids.length > 1
          ? 'Photos were successfully deleted.'
          : 'Photo was successfully deleted.'
      );
    },
    onError: handleApiError,
  });
};
