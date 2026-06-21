import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { trailsApi, HikingTraiFieldRequestMap } from "@api/public";
import { useLastUpdated } from "@context/LastUpdate";
import { handleApiError } from "@utils/errorHandlers";
import { capitalize, toKebabOrSpace } from "@utils/mixedUtils";

const isItemsField = (
  f: keyof HikingTraiFieldRequestMap,
): f is "availableHuts" | "destinations" =>
  f === "availableHuts" || f === "destinations";

const isItemsResponse = (
  data: any,
): data is { items: any[]; lastUpdate: string } => {
  return data && "items" in data && "lastUpdate" in data;
};
/**
 * Updated hook: pass React Hook Form's reset function instead of setState
 */
export const useUpdateHikingTrailField = <
  K extends keyof HikingTraiFieldRequestMap,
>(
  field: K,
  trailId: number,
) => {
  const queryClient = useQueryClient();
  const { setLastUpdated } = useLastUpdated();

  return useMutation({
    mutationKey: [`update${capitalize(field)}`],

    mutationFn: (data: HikingTraiFieldRequestMap[K]) =>
      trailsApi.updateHikingTrailField(field, trailId, data),

    onSuccess: (data) => {
      if (!data) {
        toast.error(`Failed to update ${field}.`);
        return;
      }

      let extractedValue: any;
      let lastUpdated: string;

      // ---------------------------------------------------
      // CASE 1: availableHuts / destinations (UpdateItemsResponse)
      // ---------------------------------------------------
      if (isItemsField(field) && isItemsResponse(data)) {
        extractedValue = data.items;
        lastUpdated = data.lastUpdate;
      }

      // ---------------------------------------------------
      // CASE 2: all other fields (simple key + lastUpdateDate)
      // ---------------------------------------------------
      else {
        const valueKey = Object.keys(data).find(
          (k) => k !== "lastUpdateDate",
        ) as keyof typeof data;

        extractedValue = data[valueKey];
        lastUpdated = data.lastUpdateDate;
      }

      setLastUpdated(lastUpdated);

      queryClient.setQueryData(["trail", String(trailId)], (old: any) => {
        let fieldValue = extractedValue;

        if (field === "availableHuts") {
          fieldValue = extractedValue.map((h: any) => ({
            id: h.id,
            accommodationName: h.name ?? h.accommodationName,
          }));
        }

        if (field === "destinations") {
          fieldValue = extractedValue.map((d: any) => ({
            id: d.id,
            destinationName: d.name,
          }));
        }

        console.log("fieldValue being set in cache", fieldValue);
        console.log("raw extractedValue", extractedValue);

        console.group(`🔧 Updating trail ${trailId} field: ${field}`);

        console.log("Old value:", old);
        console.log("Extracted value:", fieldValue);
        console.log("Last updated:", lastUpdated);

        const updated = {
          ...old,
          [field]: fieldValue,
          lastUpdateDate: lastUpdated,
        };

        console.log("New value:", updated);
        console.groupEnd();

        console.log("extractedValue from server", extractedValue);
        console.log("fieldValue after mapping", fieldValue);

        return updated;
      });
      toast.success(
        `You successfully updated ${toKebabOrSpace(field, false)} field.`,
      );
      console.log("Extracted value " + extractedValue);

      return extractedValue;
    },

    onError: handleApiError,
  });
};
