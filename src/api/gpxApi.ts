import { PUBLIC_ROUTES } from '../constants';
import { ApiClient } from './apiClient';

const apiClient = new ApiClient();

export const gpxApi = {
  uploadGpxFile: (
    trailId: string,
    gpxFile: FormData
  ): Promise<{ gpxUrl: string; creationDate: string }> =>
    apiClient.patch(PUBLIC_ROUTES.gpx.gpxUpload(trailId), gpxFile, true),

  removeGpxFile: (trailId: string): Promise<void> =>
    apiClient.delete(PUBLIC_ROUTES.gpx.gpxUpload(trailId)),
};
