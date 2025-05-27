import { Dispatch, SetStateAction } from 'react';
import { useMutation } from '@tanstack/react-query';

import { toast } from 'react-toastify';

import { gpxApi } from '../../../api/gpxApi';

import { handleApiError } from '../../../utils/errorHandlers';

export const useDeleteGpxFile = (
  setGpxFile: Dispatch<SetStateAction<string | null>>,
  setCreationDate: Dispatch<SetStateAction<string>>
) => {
  return useMutation({
    mutationKey: ['deleteGpxFile'],
    mutationFn: (trailId: string) => gpxApi.removeGpxFile(trailId),
    onSuccess: () => {
      setGpxFile(null);
      setCreationDate('');

      toast.success('Your GPX file was deleted successfully.');
    },
    onError: handleApiError,
  });
};
