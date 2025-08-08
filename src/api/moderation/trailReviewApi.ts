import { ITrailReview } from '../../types';
import { ApiClient } from '../apiClient';

const apiClient = new ApiClient();
const baseUrl = '/moderation/trails';

export interface WaitingApprovalTrailsResponse {
  content: ITrailReview[];
  totalElements: number;
}

export const trailReviewApi = {
  claimForReviewTrailImages: (trailId: string): Promise<void> =>
    apiClient.patch(`${baseUrl}/${trailId}/images/claim`),

  unclaimForReviewTrailImages: (trailId: string): Promise<void> =>
    apiClient.patch(`${baseUrl}/${trailId}/images/unclaim`),
};
