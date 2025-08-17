import { MODERATION_ROUTES } from '../../constants';
import { ApiClient } from '../apiClient';

const apiClient = new ApiClient();

export const gpxReviewApi = {
  getGpxReviewer: (gpxId: string): Promise<{ reviewerId: number }> =>
    apiClient.get(MODERATION_ROUTES.gpx.reviewer(gpxId)),
};
