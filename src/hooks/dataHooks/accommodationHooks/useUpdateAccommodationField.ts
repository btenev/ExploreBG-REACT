import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  AccommodationFieldRequestMap,
  AccommodationFieldResponseMap,
  accommodationsApi,
} from "@api/public";
import { useLastUpdated } from "@context/LastUpdate";
import { formatEntityLastUpdate } from "@utils/dateUtils";
import { handleApiError } from "@utils/errorHandlers";
import { capitalize, toKebabOrSpace } from "@utils/mixedUtils";

type ExtractInnerValue<K extends keyof AccommodationFieldResponseMap> =
  AccommodationFieldResponseMap[K][K extends keyof AccommodationFieldResponseMap[K]
    ? K
    : never];

export const useUpdateAccommodationField = <
  K extends keyof AccommodationFieldRequestMap,
>(
  field: K,
  accommodationId: number
) => {
  const queryClient = useQueryClient();
  const { setLastUpdated } = useLastUpdated();

  return useMutation({
    mutationKey: [`update${capitalize(field)}`],
    mutationFn: (data: AccommodationFieldRequestMap[K]) =>
      accommodationsApi.updateAccommodationField(field, accommodationId, data),
    onSuccess: (data) => {
      if (!data) {
        toast.error(`Failed to update ${field}. Something went wrong.`);
        return;
      }

      if (field in data) {
        const extractedValue = Object.values(data)[0] as ExtractInnerValue<K>;
        const lastUpdated = data.lastUpdateDate;

        setLastUpdated(lastUpdated);

        queryClient.invalidateQueries({
          queryKey: ["accommodation", accommodationId],
          exact: true,
        });

        // Refetch all queries matching the key, even if inactive
        queryClient.refetchQueries({
          queryKey: ["accommodation", accommodationId],
          exact: true,
          type: "all", // 'active' | 'inactive' | 'all' — 'all' includes mounted and unmounted queries
        });
        toast.success(
          `You successfully updated ${toKebabOrSpace(field, false)} field.`
        );
        toast.info(`Last updated: ${formatEntityLastUpdate(lastUpdated)}`);

        // Return the updated value so parent can use it with reset()
        return extractedValue;
      }
    },
    onError: handleApiError,
  });
};
