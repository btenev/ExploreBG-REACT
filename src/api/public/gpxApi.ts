import { API_ROUTES } from "@constants";

import { ApiClient } from "../base";

const apiClient = new ApiClient();

export const gpxApi = {
  uploadGpxFile: (
    trailId: string,
    gpxFile: FormData,
  ): Promise<{ gpxUrl: string; creationDate: string }> =>
    apiClient.patch(API_ROUTES.gpx.root(trailId), gpxFile, true),

  removeGpxFile: (trailId: string): Promise<void> =>
    apiClient.delete(API_ROUTES.gpx.root(trailId)),
};
