import { API_ROUTES } from "@constants";
import { CreateTrailDto } from "@schemas/trail";
import { ITrail, ITrailReview, ReviewStatusEnum } from "@types";
import { reviewStatusConverter } from "@utils/statusConverter";

import { ApiClient } from "../base";

const apiClient = new ApiClient();

export interface WaitingApprovalTrailsResponse {
  content: ITrailReview[];
  totalElements: number;
}

export const trailReviewApi = {
  getWaitingApprovalTrails: (
    query: string,
  ): Promise<WaitingApprovalTrailsResponse> =>
    apiClient.get(API_ROUTES.moderation.trail.waitingApproval(query)),

  getCreatedTrailForReview: (trailId: string): Promise<ITrail> =>
    apiClient.get(
      API_ROUTES.moderation.trail.getCreatedTrailForReview.build(trailId),
    ),

  getTrailReviewer: (trailId: string): Promise<{ reviewerId: number }> =>
    apiClient.get(API_ROUTES.moderation.trail.reviewer(trailId)),

  claimForReviewTrailDetails: (trailId: string): Promise<void> =>
    apiClient.patch(API_ROUTES.moderation.trail.claim(trailId)),

  unclaimForReviewTrailDetails: (trailId: string): Promise<void> =>
    apiClient.patch(API_ROUTES.moderation.trail.unclaim(trailId)),

  approveTrailDetails: async (
    trailId: string,
    trailData: CreateTrailDto,
  ): Promise<{ entityStatus: ReviewStatusEnum }> => {
    try {
      const response = await apiClient.patch<{ entityStatus: unknown }>(
        API_ROUTES.moderation.trail.approve(trailId),
        trailData,
      );

      const entityStatus = reviewStatusConverter(response.entityStatus);
      return { entityStatus };
    } catch (error) {
      console.error("Error approving trail details:", error);
      throw new Error(
        "Failed to approve trail details due to invalid entity status",
      );
    }
  },

  claimForReviewTrailImages: (trailId: string): Promise<void> =>
    apiClient.patch(API_ROUTES.moderation.trail.claimImages(trailId)),

  unclaimForReviewTrailImages: (trailId: string): Promise<void> =>
    apiClient.patch(API_ROUTES.moderation.trail.unclaimImages(trailId)),

  approveTrailImages: async (
    trailId: string,
    imageIds: number[],
  ): Promise<{ entityStatus: ReviewStatusEnum }> => {
    try {
      const response = await apiClient.patch<{ entityStatus: unknown }>(
        API_ROUTES.moderation.trail.approveImages(trailId),
        { imageIds },
      );

      const entityStatus = reviewStatusConverter(response.entityStatus);
      return { entityStatus };
    } catch (error) {
      console.error("Error approving trail images:", error);
      throw new Error(
        "Failed to approve trail images due to invalid entity status",
      );
    }
  },

  claimForReviewTrailGpx: (trailId: string): Promise<void> =>
    apiClient.patch(API_ROUTES.moderation.trail.claimGpxFile(trailId)),

  unclaimForReviewTrailGpx: (trailId: string): Promise<void> =>
    apiClient.patch(API_ROUTES.moderation.trail.unclaimGpxFile(trailId)),

  approveTrailGpxFile: async (
    trailId: string,
    approved: boolean,
  ): Promise<{ entityStatus: ReviewStatusEnum }> => {
    try {
      const response = await apiClient.patch<{ entityStatus: unknown }>(
        API_ROUTES.moderation.trail.approveGpxFile(trailId),
        { approved },
      );

      const entityStatus = reviewStatusConverter(response.entityStatus);

      return { entityStatus };
    } catch (error) {
      console.error("Error approving Gpx file:", error);
      throw new Error(
        "Failed to approve Gpx file due to invalid entity status",
      );
    }
  },
};
