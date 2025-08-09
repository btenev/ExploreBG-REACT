import { ITrailReview, ReviewStatusEnum } from '../../types';
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

  claimForReviewTrailImages: (trailId: string): Promise<void> =>
    apiClient.patch(`${baseUrl}/${trailId}/images/claim`),

  unclaimForReviewTrailImages: (trailId: string): Promise<void> =>
    apiClient.patch(`${baseUrl}/${trailId}/images/unclaim`),

  approveTrailImages: (
    trailId: string,
    imageIds: number[]
  ): Promise<{ entityStatus: ReviewStatusEnum }> =>
    apiClient.patch(`${baseUrl}/${trailId}/images/approve`, { imageIds }),
};
