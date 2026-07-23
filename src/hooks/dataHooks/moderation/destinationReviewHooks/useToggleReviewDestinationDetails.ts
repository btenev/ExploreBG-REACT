import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { destinationReviewApi } from "@api/moderation";
import { handleApiError } from "@utils/errorHandlers";

export const useToggleReviewDestinationDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["toggleReviewDestinationDetails"],
    mutationFn: ({
      destinationId,
      shouldClaim,
    }: {
      destinationId: string;
      shouldClaim: boolean;
    }) => {
      return shouldClaim
        ? destinationReviewApi.claimForReviewDestinationDetails(destinationId)
        : destinationReviewApi.unclaimForReviewDestinationDetails(
            destinationId,
          );
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getDestinationReviewer", variables.destinationId],
      });

      toast.success(
        variables.shouldClaim
          ? `Destination successfully claimed for review.`
          : "Destination review claim removed.",
      );
    },

    onError: handleApiError,
  });
};
