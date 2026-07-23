import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { destinationReviewApi } from "@api/moderation";
import { APP_ROUTES } from "@constants";
import { CreateDestinationDto } from "@schemas/destination/createDestinationSchema";
import { ReviewStatusEnum } from "@types";
import { handleApiError } from "@utils/errorHandlers";

export const useApproveDestination = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["approveDestination"],
    mutationFn: ({
      destinationData,
      destinationId,
    }: {
      destinationData: CreateDestinationDto;
      destinationId: string;
    }) =>
      destinationReviewApi.approveDestinationDetails(
        destinationId,
        destinationData,
      ),

    onSuccess: async (data, { destinationId }) => {
      // Optimistically update cached destination detailsStatus & entityStatus
      queryClient.setQueryData(
        ["getCreatedDestinationForReview", destinationId],
        (old: any) => {
          if (!old) return old;
          return {
            ...old,
            detailsStatus: ReviewStatusEnum.approved,
            entityStatus: data.entityStatus ?? old.entityStatus,
          };
        },
      );

      //Remove reviewer data cache to hide claim/review buttons immediately
      console.log(
        "Before removal:",
        queryClient.getQueryData(["getDestinationReviewer", destinationId]),
      );
      queryClient.removeQueries({
        queryKey: ["getDestinationReviewer", destinationId],
        exact: true,
      });
      console.log(
        "After removal:",
        queryClient.getQueryData(["getDestinationReviewer", destinationId]),
      );

      toast.success("Destination details approved successfully!");

      // Invalidate destination query to refetch latest data from backend
      await queryClient.invalidateQueries({
        queryKey: ["getCreatedDestinationForReview", destinationId],
      });

      if (data.entityStatus === ReviewStatusEnum.approved) {
        navigate(APP_ROUTES.moderation.dashboard);
      }
    },

    onError: handleApiError,
  });
};
