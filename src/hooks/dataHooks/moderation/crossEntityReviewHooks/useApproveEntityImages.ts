import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  accommodationReviewApi,
  destinationReviewApi,
  trailReviewApi,
} from "@api/moderation";
import { MODERATION_ROUTES } from "@constants";
import { PhotoEntityType, ReviewStatusEnum } from "@types";
import { handleApiError } from "@utils/errorHandlers";

export const useApproveEntityImages = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["approveEntityImages"],
    mutationFn: ({
      entityId,
      photoEntityType,
      imageIds,
    }: {
      entityId: string;
      photoEntityType: PhotoEntityType;
      imageIds: number[];
    }) => {
      switch (photoEntityType) {
        case "trail":
          return trailReviewApi.approveTrailImages(entityId, imageIds);
        case "accommodation":
          return accommodationReviewApi.approveAccommodationImages(
            entityId,
            imageIds
          );
        case "destination":
          return destinationReviewApi.approveDestinationImages(
            entityId,
            imageIds
          );
        default:
          throw new Error(`Unsupported entity type: ${photoEntityType}`);
      }
    },

    onSuccess: async (data, variables) => {
      queryClient.removeQueries({
        queryKey: ["getImageReviewer", variables.entityId],
        exact: true,
      });

      // Invalidate trail query to refetch latest data from backend
      await queryClient.invalidateQueries({
        queryKey: ["getCreatedTrailForReview", variables.entityId],
      });

      if (data.entityStatus === ReviewStatusEnum.approved) {
        navigate(MODERATION_ROUTES.dashboard);
      }
      toast.success(
        `${variables.imageIds.length} image${
          variables.imageIds.length > 1 ? "s" : ""
        } approved successfully.`
      );
    },

    onError: handleApiError,
  });
};
