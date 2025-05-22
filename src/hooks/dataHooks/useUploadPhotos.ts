import { Dispatch } from 'react';
import { useMutation } from '@tanstack/react-query';

import { toast } from 'react-toastify';

import { imagesApi } from '../../api/imagesApi';
import { ALLOWED_PHOTO_UPLOAD_COUNT } from '../../constants';
import { PhotosAction } from '../../context/PhotosContextProvider';
import { handleApiError } from '../../utils/errorHandlers';

interface UploadPhotosParams {
  entityId: string;
  uploadData: FormData;
  originalFileCount: number;
  previousPhotoCount: number;
}

export const useUploadPhotos = (dispatch: Dispatch<PhotosAction>) => {
  return useMutation({
    mutationKey: ['upload-photos'],
    mutationFn: ({ entityId, uploadData }: UploadPhotosParams) =>
      imagesApi.uploadEntityPhotos(entityId, uploadData),
    onSuccess: (data, { originalFileCount, previousPhotoCount }) => {
      if (!data || data.length === 0) {
        toast.error('No photos were uploaded.');
        return;
      }

      dispatch({ type: 'APPEND_PHOTOS', payload: data });

      const totalAfterUpload = previousPhotoCount + originalFileCount;

      dispatch({ type: 'SET_IS_UPLOADING', payload: false });

      if (totalAfterUpload < ALLOWED_PHOTO_UPLOAD_COUNT) {
        toast.success('Your photos were uploaded successfully.');
      } else if (totalAfterUpload === ALLOWED_PHOTO_UPLOAD_COUNT) {
        toast.success('Your photos were uploaded successfully. Upload limit reached.');
      } else {
        toast.info(
          `Only ${
            ALLOWED_PHOTO_UPLOAD_COUNT - previousPhotoCount
          } photo(s) were uploaded due to the upload limit.`
        );
      }
    },
    onError: handleApiError,
  });
};
