import { ApiClient } from '../apiClient';
import { ReviewStatusEnum } from '../../types';
import { WaitingApprovalEntityResponse } from './accommodationReviewApi';
import { reviewStatusConverter } from '../../utils/statusConverter';
import { MODERATION_ROUTES } from '../../constants';

const apiClient = new ApiClient();

export const destinationReviewApi = {
  getWaitingDestinations: (query: string): Promise<WaitingApprovalEntityResponse> =>
    apiClient.get(MODERATION_ROUTES.destination.getWaitingApprovalDestinations(query)),

  claimForReviewDestinationImages: (destinationId: string): Promise<void> =>
    apiClient.patch(MODERATION_ROUTES.destination.claimForReviewDestinationImages(destinationId)),

  unclaimForReviewDestinationImages: (destinationId: string): Promise<void> =>
    apiClient.patch(MODERATION_ROUTES.destination.unclaimForReviewDestinationImages(destinationId)),

  approveDestinationImages: async (
    destinationId: string,
    imageIds: number[]
  ): Promise<{ entityStatus: ReviewStatusEnum }> => {
    try {
      const response = await apiClient.patch<{ entityStatus: unknown }>(
        MODERATION_ROUTES.destination.approveDestinationImages(destinationId),
        {
          imageIds,
        }
      );

      const entityStatus = reviewStatusConverter(response.entityStatus);
      return { entityStatus };
    } catch (error) {
      console.error('Error approving destination images:', error);
      throw new Error('Failed to approve destination images due to invalid entity status');
    }
  },
};
