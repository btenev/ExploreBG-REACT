import { MODERATION_ROUTES } from "@constants";

import { ApiClient } from "../base";

const apiClient = new ApiClient();

export const imageModerationApi = {
  getImageReviewer: (imageId: string): Promise<{ reviewerId: number }> =>
    apiClient.get(MODERATION_ROUTES.images.reviewer(imageId)),
};
