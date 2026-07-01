import { API_ROUTES } from "@constants";

import { ApiClient } from "../base";

const apiClient = new ApiClient();

export const gpxReviewApi = {
  getGpxReviewer: (gpxId: string): Promise<{ reviewerId: number }> =>
    apiClient.get(API_ROUTES.moderation.gpx.reviewer(gpxId)),
};
