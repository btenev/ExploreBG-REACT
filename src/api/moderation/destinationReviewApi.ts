import { ApiClient } from '../apiClient';

const apiClient = new ApiClient();
const baseUrl = '/moderation/destinations';

export const destinationReviewApi = {
  claimForReviewDestinationImages: (destinationId: string): Promise<void> =>
    apiClient.patch(`${baseUrl}/${destinationId}/images/claim`),

  unclaimForReviewDestinationImages: (destinationId: string): Promise<void> =>
    apiClient.patch(`${baseUrl}/${destinationId}/images/unclaim`),
};
