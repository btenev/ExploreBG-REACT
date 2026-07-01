import { API_ROUTES } from "@constants";
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
    query: string,
  ): Promise<WaitingApprovalEntityResponse> =>
    apiClient.get(API_ROUTES.moderation.accommodation.waitingApproval(query)),

  claimForReviewAccommodationImages: (accommodationId: string): Promise<void> =>
    apiClient.patch(
      API_ROUTES.moderation.accommodation.claimImages(accommodationId),
    ),

  unclaimForReviewAccommodationImages: (
    accommodationId: string,
  ): Promise<void> =>
    apiClient.patch(
      API_ROUTES.moderation.accommodation.unclaimImages(accommodationId),
    ),

  approveAccommodationImages: async (
    accommodationId: string,
    imageIds: number[],
  ): Promise<{ entityStatus: ReviewStatusEnum }> => {
    try {
      const response = await apiClient.patch<{ entityStatus: unknown }>(
        API_ROUTES.moderation.accommodation.approveImages(accommodationId),
        { imageIds },
      );

      const entityStatus = reviewStatusConverter(response.entityStatus);
      return { entityStatus };
    } catch (error) {
      console.error("Error approving accommodation images:", error);
      throw new Error(
        "Failed to approve accommodation images due to invalid entity status",
      );
    }
  },
};
