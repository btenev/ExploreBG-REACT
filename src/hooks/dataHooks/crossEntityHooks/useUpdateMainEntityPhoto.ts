import { useMutation } from "@tanstack/react-query";
import { Dispatch } from "react";
import { toast } from "react-toastify";

import { accommodationsApi, destinationsApi, trailsApi } from "@api/public";
import { PhotosAction } from "@context/Photos";
import { EntityType } from "@types";
import { handleApiError } from "@utils/errorHandlers";

export const useUpdateMainEntityPhoto = (
  entityType: EntityType,
  dispatch: Dispatch<PhotosAction>
) => {
  const apiMapper: Record<
    EntityType,
    ({
      entityId,
      data,
    }: {
      entityId: string;
      data: { imageId: string };
    }) => Promise<{ imageId: number }>
  > = {
    trail: ({ entityId, data }) =>
      trailsApi.updateMainTrailPhoto(entityId, data),
    accommodation: ({ entityId, data }) =>
      accommodationsApi.updateMainAccommodationPhoto(entityId, data),
    destination: ({ entityId, data }) =>
      destinationsApi.updateMainDestinationPhoto(entityId, data),
  };
  return useMutation({
    mutationKey: ["updateMainTrailPhoto"],
    mutationFn: ({
      entityId,
      data,
    }: {
      entityId: string;
      data: { imageId: string };
    }) => apiMapper[entityType]({ entityId, data }),
    onSuccess: (data) => {
      if (!data || !data.imageId) {
        toast.error("No photo was uploaded.");
        return;
      }
      dispatch({ type: "SET_MAIN_PHOTO", payload: data.imageId });

      toast.success("You successfully changed your main photo");
    },
    onError: handleApiError,
  });
};
