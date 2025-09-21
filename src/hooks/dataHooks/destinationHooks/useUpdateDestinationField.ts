import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  DestinationFieldRequestMap,
  DestinationFieldResponseMap,
  destinationsApi,
} from "@api/public";
import { useLastUpdated } from "@context/LastUpdate";
import { formatEntityLastUpdate } from "@utils/dateUtils";
import { handleApiError } from "@utils/errorHandlers";
import { capitalize, toKebabOrSpace } from "@utils/mixedUtils";

type ExtractInnerValue<K extends keyof DestinationFieldResponseMap> =
  DestinationFieldResponseMap[K][K extends keyof DestinationFieldResponseMap[K]
    ? K
    : never];

export const useUpdateDestinationField = <
  K extends keyof DestinationFieldRequestMap,
>(
  field: K,
  destinationId: number
) => {
  const queryClient = useQueryClient();
  const { setLastUpdated } = useLastUpdated();

  return useMutation({
    mutationKey: [`update${capitalize(field)}`],
    mutationFn: (data: DestinationFieldRequestMap[K]) =>
      destinationsApi.updateDestinationField(field, destinationId, data),
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
          queryKey: ["destination", destinationId],
          exact: true,
        });

        // Refetch all queries matching the key, even if inactive
        queryClient.refetchQueries({
          queryKey: ["destination", destinationId],
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
