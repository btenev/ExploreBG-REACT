import { ApiClient } from '../apiClient';
import { IWaitingApproval, ReviewStatusEnum } from '../../types';
import { reviewStatusConverter } from '../../utils/statusConverter';

const apiClient = new ApiClient();
const baseUrl = '/moderation/accommodations';

export interface WaitingApprovalEntityResponse {
  content: IWaitingApproval[];
  totalElements: number;
}

export const accommodationReviewApi = {
  getWaitingApprovalAccommodations: (query: string): Promise<WaitingApprovalEntityResponse> =>
    apiClient.get(`${baseUrl}/waiting-approval${query}`),

  claimForReviewAccommodationImages: (accommodationId: string): Promise<void> =>
    apiClient.patch(`${baseUrl}/${accommodationId}/images/claim`),

  unclaimForReviewAccommodationImages: (accommodationId: string): Promise<void> =>
    apiClient.patch(`${baseUrl}/${accommodationId}/images/unclaim`),

  approveAccommodationImages: async (
    accommodationId: string,
    imageIds: number[]
  ): Promise<{ entityStatus: ReviewStatusEnum }> => {
    try {
      const response = await apiClient.patch<{ entityStatus: unknown }>(
        `${baseUrl}/${accommodationId}/images/approve`,
        { imageIds }
      );

      const entityStatus = reviewStatusConverter(response.entityStatus);
      return { entityStatus };
    } catch (error) {
      console.error('Error approving accommodation images:', error);
      throw new Error('Failed to approve accommodation images due to invalid entity status');
    }
  },
};
