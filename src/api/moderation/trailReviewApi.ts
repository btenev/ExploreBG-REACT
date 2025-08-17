import { MODERATION_ROUTES } from '../../constants';
import { CreateTrailDto } from '../../schemas';
import { ITrail, ITrailReview, ReviewStatusEnum } from '../../types';
import { reviewStatusConverter } from '../../utils/statusConverter';
import { ApiClient } from '../apiClient';

const apiClient = new ApiClient();

export interface WaitingApprovalTrailsResponse {
  content: ITrailReview[];
  totalElements: number;
}

export const trailReviewApi = {
  getWaitingApprovalTrails: (query: string): Promise<WaitingApprovalTrailsResponse> =>
    apiClient.get(MODERATION_ROUTES.trail.getWaitingApprovalTrails(query)),

  getCreatedTrailForReview: (trailId: string): Promise<ITrail> =>
    apiClient.get(MODERATION_ROUTES.trail.getCreatedTrailForReview.build(trailId)),

  getTrailReviewer: (trailId: string): Promise<{ reviewerId: number }> =>
    apiClient.get(MODERATION_ROUTES.trail.getTrailReviewer(trailId)),

  claimForReviewTrailDetails: (trailId: string): Promise<void> =>
    apiClient.patch(MODERATION_ROUTES.trail.claimTrailForReview(trailId)),

  unclaimForReviewTrailDetails: (trailId: string): Promise<void> =>
    apiClient.patch(MODERATION_ROUTES.trail.unclaimTrailForReview(trailId)),

  approveTrailDetails: async (
    trailId: string,
    trailData: CreateTrailDto
  ): Promise<{ entityStatus: ReviewStatusEnum }> => {
    try {
      const response = await apiClient.patch<{ entityStatus: unknown }>(
        MODERATION_ROUTES.trail.approveTrailDetails(trailId),
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
    apiClient.patch(MODERATION_ROUTES.trail.claimTrailImagesForReview(trailId)),

  unclaimForReviewTrailImages: (trailId: string): Promise<void> =>
    apiClient.patch(MODERATION_ROUTES.trail.unclaimTrailImagesForReview(trailId)),

  approveTrailImages: async (
    trailId: string,
    imageIds: number[]
  ): Promise<{ entityStatus: ReviewStatusEnum }> => {
    try {
      const response = await apiClient.patch<{ entityStatus: unknown }>(
        MODERATION_ROUTES.trail.approveTrailImagesForReview(trailId),
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
    apiClient.patch(MODERATION_ROUTES.trail.claimTrailForReview(trailId)),

  unclaimForReviewTrailGpx: (trailId: string): Promise<void> =>
    apiClient.patch(MODERATION_ROUTES.trail.unclaimTrailForReview(trailId)),

  approveTrailGpxFile: async (
    trailId: string,
    approved: boolean
  ): Promise<{ entityStatus: ReviewStatusEnum }> => {
    try {
      const response = await apiClient.patch<{ entityStatus: unknown }>(
        MODERATION_ROUTES.trail.approveTrailGpxfile(trailId),
        { approved }
      );

      const entityStatus = reviewStatusConverter(response.entityStatus);

      return { entityStatus };
    } catch (error) {
      console.error('Error approving Gpx file:', error);
      throw new Error('Failed to approve Gpx file due to invalid entity status');
    }
  },
};
