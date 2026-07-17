import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { accommodationReviewApi } from "@api/moderation";
import { APP_ROUTES } from "@constants";
import { CreateAccommodationDto } from "@schemas/accommodation";
import { ReviewStatusEnum } from "@types";
import { handleApiError } from "@utils/errorHandlers";

export const useApproveAccommodation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["approveAccommodation"],
    mutationFn: ({
      accommodationData,
      accommodationId,
    }: {
      accommodationData: CreateAccommodationDto;
      accommodationId: string;
    }) =>
      accommodationReviewApi.approveAccommodationDetails(
        accommodationId,
        accommodationData,
      ),

    onSuccess: async (data, { accommodationId }) => {
      // Optimistically update cached accommodation detailsStatus & entityStatus
      queryClient.setQueryData(
        ["getCreatedAccommodationForReview", accommodationId],
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
        queryClient.getQueryData(["getAccommodationReviewer", accommodationId]),
      );
      queryClient.removeQueries({
        queryKey: ["getAccommodationReviewer", accommodationId],
        exact: true,
      });
      console.log(
        "After removal:",
        queryClient.getQueryData(["getAccommodationReviewer", accommodationId]),
      );

      toast.success("Accommodation details approved successfully!");

      // Invalidate accommodation query to refetch latest data from backend
      await queryClient.invalidateQueries({
        queryKey: ["getCreatedAccommodationForReview", accommodationId],
      });

      if (data.entityStatus === ReviewStatusEnum.approved) {
        navigate(APP_ROUTES.moderation.dashboard);
      }
    },

    onError: handleApiError,
  });
};
