import { IWaitingApproval } from '../../types';
import { ApiClient } from '../apiClient';

const apiClient = new ApiClient();
const baseUrl = '/moderation/accommodations';

export interface WaitingApprovalEntityResponse {
  content: IWaitingApproval[];
  totalElements: number;
}

export const accommodationReviewApi = {
  claimForReviewAccommodationImages: (accommodationId: string): Promise<void> =>
    apiClient.patch(`${baseUrl}/${accommodationId}/images/claim`),

  unclaimForReviewAccommodationImages: (accommodationId: string): Promise<void> =>
    apiClient.patch(`${baseUrl}/${accommodationId}/images/unclaim`),
};
