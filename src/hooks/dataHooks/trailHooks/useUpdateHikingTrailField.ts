import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  trailsApi,
  HikingTraiFieldRequestMap,
  HikingTraiFieldResponseMap,
} from "@api/public";
import { useLastUpdated } from "@context/LastUpdate";
import { formatEntityLastUpdate } from "@utils/dateUtils";
import { handleApiError } from "@utils/errorHandlers";
import { capitalize, toKebabOrSpace } from "@utils/mixedUtils";

type ExtractInnerValue<K extends keyof HikingTraiFieldResponseMap> =
  HikingTraiFieldResponseMap[K][K extends keyof HikingTraiFieldResponseMap[K]
    ? K
    : never];

/**
 * Updated hook: pass React Hook Form's reset function instead of setState
 */
export const useUpdateHikingTrailField = <
  K extends keyof HikingTraiFieldRequestMap,
>(
  field: K,
  trailId: number
) => {
  const queryClient = useQueryClient();
  const { setLastUpdated } = useLastUpdated();

  return useMutation({
    mutationKey: [`update${capitalize(field)}`],
    mutationFn: (data: HikingTraiFieldRequestMap[K]) =>
      trailsApi.updateHikingTrailField(field, trailId, data),
    onSuccess: (data, variables, context) => {
      if (!data) {
        toast.error(`Failed to update ${field}. Something went wrong.`);
        return;
      }

      if (field in data) {
        const extractedValue = Object.values(data)[0] as ExtractInnerValue<K>;
        const lastUpdated = data.lastUpdateDate;

        setLastUpdated(lastUpdated);

        queryClient.invalidateQueries({
          queryKey: ["trail", trailId],
          exact: true,
        });

        // Refetch all queries matching the key, even if inactive
        queryClient.refetchQueries({
          queryKey: ["trail", trailId],
          exact: true,
          type: "all", // 'active' | 'inactive' | 'all' — 'all' includes mounted and unmounted queries
        });
        toast.success(
          `You successfully updated ${toKebabOrSpace(field, false)} field.`
        );
        toast.info(`Last updated: ${formatEntityLastUpdate(lastUpdated)}`);

        // Return the updated value so parent can use it with reset()
        return extractedValue;
      } else {
        toast.error(`Response did not contain expected field: ${field}`);
      }
    },
    onError: handleApiError,
  });
};
