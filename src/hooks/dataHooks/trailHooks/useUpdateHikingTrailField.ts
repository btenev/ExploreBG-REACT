import { Dispatch, SetStateAction } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  HikingTraiFieldRequestMap,
  HikingTraiFieldResponseMap,
  trailsApi,
} from '../../../api/trailsApi';
import { handleApiError } from '../../../utils/errorHandlers';
import { capitalize } from '../../../utils/mixedUtils';

type ExtractInnerValue<K extends keyof HikingTraiFieldResponseMap> =
  HikingTraiFieldResponseMap[K][keyof HikingTraiFieldResponseMap[K]];

export const useUpdateHikingTrailField = <K extends keyof HikingTraiFieldRequestMap>(
  field: K,
  trailId: number,
  setStateValue?: Dispatch<SetStateAction<ExtractInnerValue<K>>>
) => {
  return useMutation({
    mutationKey: [`update${capitalize(field)}`],
    mutationFn: (data: HikingTraiFieldRequestMap[K]) =>
      trailsApi.updateHikingTrailField(field, trailId, data),
    onSuccess: (data) => {
      if (!data) {
        toast.error(`Failed to update ${field}. Something went wrong.`);
        return;
      }

      const value = Object.values(data)[0] as ExtractInnerValue<K>;
      if (setStateValue) {
        setStateValue(value);
      }
    },
    onError: handleApiError,
  });
};
