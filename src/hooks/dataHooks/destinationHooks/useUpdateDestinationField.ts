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
import {
  capitalize,
  formatCoordinate,
  toKebabOrSpace,
} from "@utils/mixedUtils";

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

      if (field === "location" || field in data) {
        let extractedValue: ExtractInnerValue<K>;
        const lastUpdated = data.lastUpdateDate;

        let successMsg: string;

        if (field === "location") {
          // location is flat: longitude + latitude
          const { latitude, longitude } =
            data as DestinationFieldResponseMap["location"];
          extractedValue = { latitude, longitude } as ExtractInnerValue<K>;
          successMsg = `You successfully updated location: ${formatCoordinate(latitude, longitude)}`;
        } else {
          // wrapped field, e.g. destinationName, type
          extractedValue = Object.values(data)[0] as ExtractInnerValue<K>;
          successMsg = `You successfully updated ${toKebabOrSpace(
            field,
            false
          )} field.`;
        }

        setLastUpdated(lastUpdated);

        queryClient.invalidateQueries({
          queryKey: ["destination", destinationId],
          exact: true,
        });

        queryClient.refetchQueries({
          queryKey: ["destination", destinationId],
          exact: true,
          type: "all",
        });

        toast.success(successMsg);
        toast.info(`Last updated: ${formatEntityLastUpdate(lastUpdated)}`);

        return extractedValue;
      }
    },
    onError: handleApiError,
  });
};
