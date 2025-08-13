import { ApiClient } from '../apiClient';
import { ReviewStatusEnum } from '../../types';
import { WaitingApprovalEntityResponse } from './accommodationReviewApi';
import { reviewStatusConverter } from '../../utils/statusConverter';

const apiClient = new ApiClient();
const baseUrl = '/moderation/destinations';

export const destinationReviewApi = {
  getWaitingDestinations: (query: string): Promise<WaitingApprovalEntityResponse> =>
    apiClient.get(`${baseUrl}/waiting-approval${query}`),

  claimForReviewDestinationImages: (destinationId: string): Promise<void> =>
    apiClient.patch(`${baseUrl}/${destinationId}/images/claim`),

  unclaimForReviewDestinationImages: (destinationId: string): Promise<void> =>
    apiClient.patch(`${baseUrl}/${destinationId}/images/unclaim`),

  approveDestinationImages: async (
    destinationId: string,
    imageIds: number[]
  ): Promise<{ entityStatus: ReviewStatusEnum }> => {
    try {
      const response = await apiClient.patch<{ entityStatus: unknown }>(
        `${baseUrl}/${destinationId}/images/approve`,
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
