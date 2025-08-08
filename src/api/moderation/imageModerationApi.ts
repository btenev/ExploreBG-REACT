import { ApiClient } from '../apiClient';

const apiClient = new ApiClient();
const basePath = '/moderation/images';

export const imageModerationApi = {
  getImageReviewer: (imageId: string): Promise<{ reviewerId: number }> =>
    apiClient.get(`${basePath}/${imageId}/reviewer`),
};
