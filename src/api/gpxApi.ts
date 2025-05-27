import { ApiClient } from './apiClient';

const apiClient = new ApiClient();

const baseGpxUrl = '/gpx';

export const gpxApi = {
  uploadGpxFile: (
    trailId: string,
    gpxFile: FormData
  ): Promise<{ gpxUrl: string; creationDate: string }> =>
    apiClient.patch(`${baseGpxUrl}/trail/${trailId}`, gpxFile, true),

  removeGpxFile: (trailId: string): Promise<void> =>
    apiClient.delete(`${baseGpxUrl}/trail/${trailId}`),
};
