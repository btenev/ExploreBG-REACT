import { MODERATION_ROUTES } from "@constants";
import { IWaitingApproval, ReviewStatusEnum } from "@types";
import { reviewStatusConverter } from "@utils/statusConverter";

import { ApiClient } from "../base";

const apiClient = new ApiClient();

export interface WaitingApprovalEntityResponse {
  content: IWaitingApproval[];
  totalElements: number;
}

export const accommodationReviewApi = {
  getWaitingApprovalAccommodations: (
    query: string
  ): Promise<WaitingApprovalEntityResponse> =>
    apiClient.get(
      MODERATION_ROUTES.accommodation.getWaitingApprovalAccommodations(query)
    ),

  claimForReviewAccommodationImages: (accommodationId: string): Promise<void> =>
    apiClient.patch(
      MODERATION_ROUTES.accommodation.claimForReviewAccommodationImages(
        accommodationId
      )
    ),

  unclaimForReviewAccommodationImages: (
    accommodationId: string
  ): Promise<void> =>
    apiClient.patch(
      MODERATION_ROUTES.accommodation.unclaimForReviewAccommodationImages(
        accommodationId
      )
    ),

  approveAccommodationImages: async (
    accommodationId: string,
    imageIds: number[]
  ): Promise<{ entityStatus: ReviewStatusEnum }> => {
    try {
      const response = await apiClient.patch<{ entityStatus: unknown }>(
        MODERATION_ROUTES.accommodation.approveAccommodationImages(
          accommodationId
        ),
        { imageIds }
      );

      const entityStatus = reviewStatusConverter(response.entityStatus);
      return { entityStatus };
    } catch (error) {
      console.error("Error approving accommodation images:", error);
      throw new Error(
        "Failed to approve accommodation images due to invalid entity status"
      );
    }
  },
};
