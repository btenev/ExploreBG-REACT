import { API_ROUTES } from "@constants";
import { CreateDestinationDto } from "@schemas/destination";
import { IDestination, ReviewStatusEnum } from "@types";
import { reviewStatusConverter } from "@utils/statusConverter";

import { WaitingApprovalEntityResponse } from "./accommodationReviewApi";
import { ApiClient } from "../base";

const apiClient = new ApiClient();

export const destinationReviewApi = {
  getWaitingDestinations: (
    query: string,
  ): Promise<WaitingApprovalEntityResponse> =>
    apiClient.get(API_ROUTES.moderation.destination.waitingApproval(query)),

  getCreatedDestinationForReview: (
    destinationId: string,
  ): Promise<IDestination> =>
    apiClient.get(
      API_ROUTES.moderation.destination.getCreatedDestinationForReview.build(
        destinationId,
      ),
    ),

  getDestinationReviewer: (
    destinationId: string,
  ): Promise<{ reviewerId: number }> =>
    apiClient.get(API_ROUTES.moderation.destination.reviewer(destinationId)),

  claimForReviewDestinationDetails: (destinationId: string): Promise<void> =>
    apiClient.patch(API_ROUTES.moderation.destination.claim(destinationId)),

  unclaimForReviewDestinationDetails: (destinationId: string): Promise<void> =>
    apiClient.patch(API_ROUTES.moderation.destination.unclaim(destinationId)),

  approveDestinationDetails: async (
    destinationId: string,
    destinationData: CreateDestinationDto,
  ): Promise<{ entityStatus: ReviewStatusEnum }> => {
    try {
      const response = await apiClient.patch<{ entityStatus: unknown }>(
        API_ROUTES.moderation.destination.approve(destinationId),
        destinationData,
      );

      const entityStatus = reviewStatusConverter(response.entityStatus);
      return { entityStatus };
    } catch (error) {
      console.error("Error approving destination details:", error);
      throw new Error(
        "Failed to approve destination details due to invalid entity status",
      );
    }
  },

  claimForReviewDestinationImages: (destinationId: string): Promise<void> =>
    apiClient.patch(
      API_ROUTES.moderation.destination.claimImages(destinationId),
    ),

  unclaimForReviewDestinationImages: (destinationId: string): Promise<void> =>
    apiClient.patch(
      API_ROUTES.moderation.destination.unclaimImages(destinationId),
    ),

  approveDestinationImages: async (
    destinationId: string,
    imageIds: number[],
  ): Promise<{ entityStatus: ReviewStatusEnum }> => {
    try {
      const response = await apiClient.patch<{ entityStatus: unknown }>(
        API_ROUTES.moderation.destination.approveImages(destinationId),
        {
          imageIds,
        },
      );

      const entityStatus = reviewStatusConverter(response.entityStatus);
      return { entityStatus };
    } catch (error) {
      console.error("Error approving destination images:", error);
      throw new Error(
        "Failed to approve destination images due to invalid entity status",
      );
    }
  },
};
