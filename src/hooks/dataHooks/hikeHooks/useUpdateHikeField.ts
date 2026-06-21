import * as Sentry from "@sentry/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { HikeFieldRequestMap, hikesApi } from "@api/public";
import { useLastUpdated } from "@context/LastUpdate";
import { ApiError } from "@types";
import { handleApiError } from "@utils/errorHandlers";
import { capitalize, toKebabOrSpace } from "@utils/mixedUtils";

// type ExtractInnerValue<K extends keyof HikeFieldResponseMap> =
//   HikeFieldResponseMap[K][K extends keyof HikeFieldResponseMap[K] ? K : never];

const isItemsField = (f: keyof HikeFieldRequestMap): f is "trail" =>
  f === "trail";

const isItemsResponse = (
  data: any,
): data is { items: any[]; lastUpdate: string } => {
  return data && "items" in data && "lastUpdate" in data;
};

/**
 * Updated hook: pass React Hook Form's reset function instead of setState
 */
export const useUpdateHikeField = <K extends keyof HikeFieldRequestMap>(
  field: K,
  hikeId: number,
) => {
  const queryClient = useQueryClient();
  const { setLastUpdated } = useLastUpdated();

  return useMutation({
    mutationKey: [`update${capitalize(field)}`],
    mutationFn: (data: HikeFieldRequestMap[K]) => {
      Sentry.addBreadcrumb({
        category: "mutation",
        message: `Updating hike field: ${field}`,
        level: "info",
        data: { hikeId, field },
      });
      return hikesApi.updateHikeField(field, hikeId, data);
    },
    onSuccess: (data) => {
      if (!data) {
        Sentry.captureMessage(`Failed to update ${field}: empty response`, {
          level: "error",
          extra: { hikeId, field },
        });
        toast.error(`Failed to update ${field}. Something went wrong.`);
        return;
      }

      let extractedValue: any;
      let lastUpdated: string;

      if (isItemsField(field) && isItemsResponse(data)) {
        extractedValue = data.items;
        lastUpdated = data.lastUpdate;
      } else {
        const valueKey = Object.keys(data).find(
          (k) => k !== "lastUpdateDate",
        ) as keyof typeof data;

        extractedValue = data[valueKey];
        lastUpdated = data.lastUpdateDate;
      }

      setLastUpdated(lastUpdated);

      queryClient.setQueryData(["hike", String(hikeId)], (old: any) => {
        let fieldValue = extractedValue;

        if (field === "trail") {
          const mapped = extractedValue.map((t: any) => ({
            id: t.id,
            trailName: t.name ?? t.trailName,
          }));
          fieldValue = mapped[0] ?? null; // ← single object or null, not array
        }

        console.log("fieldValue being set in cache", fieldValue);
        console.log("raw extractedValue", extractedValue);

        console.group(`🔧 Updating hike ${hikeId} field: ${field}`);

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
    onError: (error: ApiError) => {
      Sentry.captureException(error, { extra: { hikeId, field } });
      handleApiError(error);
    },
  });
};
