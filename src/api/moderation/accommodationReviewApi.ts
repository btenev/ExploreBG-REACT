import { ApiClient } from '../apiClient';
import { IWaitingApproval, ReviewStatusEnum } from '../../types';

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

  approveAccommodationImages: (
    accommodationId: string,
    imageIds: number[]
  ): Promise<{ entityStatus: ReviewStatusEnum }> =>
    apiClient.patch(`${baseUrl}/${accommodationId}/images/approve`, { imageIds }),
};
