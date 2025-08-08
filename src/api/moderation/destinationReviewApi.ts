import { ApiClient } from '../apiClient';
import { ReviewStatusEnum } from '../../types';

const apiClient = new ApiClient();
const baseUrl = '/moderation/destinations';

export const destinationReviewApi = {
  claimForReviewDestinationImages: (destinationId: string): Promise<void> =>
    apiClient.patch(`${baseUrl}/${destinationId}/images/claim`),

  unclaimForReviewDestinationImages: (destinationId: string): Promise<void> =>
    apiClient.patch(`${baseUrl}/${destinationId}/images/unclaim`),

  approveDestinationImages: (
    destinationId: string,
    imageIds: number[]
  ): Promise<{ entityStatus: ReviewStatusEnum }> =>
    apiClient.patch(`${baseUrl}/${destinationId}/images/approve`, { imageIds }),
};
