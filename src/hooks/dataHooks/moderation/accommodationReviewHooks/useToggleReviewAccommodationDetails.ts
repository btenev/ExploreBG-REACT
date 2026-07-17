import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { accommodationReviewApi } from "@api/moderation";
import { handleApiError } from "@utils/errorHandlers";

export const useToggleReviewAccommodationDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["toggleReviewAccommodationDetails"],
    mutationFn: ({
      accommodationId,
      shouldClaim,
    }: {
      accommodationId: string;
      shouldClaim: boolean;
    }) => {
      return shouldClaim
        ? accommodationReviewApi.claimForReviewAccommodationDetails(
            accommodationId,
          )
        : accommodationReviewApi.unclaimForReviewAccommodationDetails(
            accommodationId,
          );
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getAccommodationReviewer", variables.accommodationId],
      });

      toast.success(
        variables.shouldClaim
          ? `Accommodation successfully claimed for review.`
          : "Accommodation review claim removed.",
      );
    },

    onError: handleApiError,
  });
};
