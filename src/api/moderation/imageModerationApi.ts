import { API_ROUTES } from "@constants";

import { ApiClient } from "../base";

const apiClient = new ApiClient();

export const imageModerationApi = {
  getImageReviewer: (imageId: string): Promise<{ reviewerId: number }> =>
    apiClient.get(API_ROUTES.moderation.images.reviewer(imageId)),
};
