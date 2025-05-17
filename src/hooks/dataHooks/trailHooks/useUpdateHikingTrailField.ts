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

import { useLastUpdated } from '../../../context/LastUpdateProvider';

type ExtractInnerValue<K extends keyof HikingTraiFieldResponseMap> =
  HikingTraiFieldResponseMap[K][K extends keyof HikingTraiFieldResponseMap[K] ? K : never];

export const useUpdateHikingTrailField = <K extends keyof HikingTraiFieldRequestMap>(
  field: K,
  trailId: number,
  setStateValue?: Dispatch<SetStateAction<ExtractInnerValue<K>>>
) => {
  const { setLastUpdated } = useLastUpdated();

  return useMutation({
    mutationKey: [`update${capitalize(field)}`],
    mutationFn: (data: HikingTraiFieldRequestMap[K]) =>
      trailsApi.updateHikingTrailField(field, trailId, data),
    onSuccess: (data) => {
      if (!data) {
        toast.error(`Failed to update ${field}. Something went wrong.`);
        return;
      }

      if (field in data) {
        if (setStateValue) {
          const extractedValue = Object.values(data)[0] as ExtractInnerValue<K>;
          const lastUpdated = data.lastUpdateDate;

          setStateValue(extractedValue);
          setLastUpdated(lastUpdated);

          toast.success(`You successfully updated ${field} field.`);
        }
      } else {
        toast.error(`Response did not contain expected field: ${field}`);
      }
    },
    onError: handleApiError,
  });
};
