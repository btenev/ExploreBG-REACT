import { ROUTES } from '../../constants';
import { CreateTrailDto } from '../../schemas';
import { ITrail, ITrailReview, ReviewStatusEnum } from '../../types';
import { reviewStatusConverter } from '../../utils/statusConverter';
import { ApiClient } from '../apiClient';

const apiClient = new ApiClient();
const baseUrl = '/moderation/trails';

export interface WaitingApprovalTrailsResponse {
  content: ITrailReview[];
  totalElements: number;
}

export const trailReviewApi = {
  getWaitingApprovalTrails: (query: string): Promise<WaitingApprovalTrailsResponse> =>
    apiClient.get(`${baseUrl}/waiting-approval${query}`),

  getCreatedTrailForReview: (trailId: string): Promise<ITrail> =>
    apiClient.get(`${baseUrl}/${trailId}/review`),

  getTrailReviewer: (trailId: string): Promise<{ reviewerId: number }> =>
    apiClient.get(`${baseUrl}/${trailId}/reviewer`),

  claimForReviewTrailDetails: (trailId: string): Promise<void> =>
    apiClient.patch(`${baseUrl}/${trailId}/claim`),

  unclaimForReviewTrailDetails: (trailId: string): Promise<void> =>
    apiClient.patch(`${baseUrl}/${trailId}/unclaim`),

  approveTrailDetails: async (
    trailId: string,
    trailData: CreateTrailDto
  ): Promise<{ entityStatus: ReviewStatusEnum }> => {
    try {
      const response = await apiClient.patch<{ entityStatus: unknown }>(
        `${baseUrl}/${trailId}/approve`,
        trailData
      );

      const entityStatus = reviewStatusConverter(response.entityStatus);
      return { entityStatus };
    } catch (error) {
      console.error('Error approving trail details:', error);
      throw new Error('Failed to approve trail details due to invalid entity status');
    }
  },

  claimForReviewTrailImages: (trailId: string): Promise<void> =>
    apiClient.patch(`${baseUrl}/${trailId}/images/claim`),

  unclaimForReviewTrailImages: (trailId: string): Promise<void> =>
    apiClient.patch(`${baseUrl}/${trailId}/images/unclaim`),

  approveTrailImages: async (
    trailId: string,
    imageIds: number[]
  ): Promise<{ entityStatus: ReviewStatusEnum }> => {
    try {
      const response = await apiClient.patch<{ entityStatus: unknown }>(
        `${baseUrl}/${trailId}/images/approve`,
        { imageIds }
      );

      const entityStatus = reviewStatusConverter(response.entityStatus);
      return { entityStatus };
    } catch (error) {
      console.error('Error approving trail images:', error);
      throw new Error('Failed to approve trail images due to invalid entity status');
    }
  },

  claimForReviewTrailGpx: (trailId: string): Promise<void> =>
    apiClient.patch(ROUTES.moderation.trail.claimTrailForReview({ trailId })),

  unclaimForReviewTrailGpx: (trailId: string): Promise<void> =>
    apiClient.patch(ROUTES.moderation.trail.unclaimTrailForReview({ trailId })),
};
