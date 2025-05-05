import { ApiClient } from './apiClient';
import { ITrail, ITrailCard, ToggleFavoriteRequest, ToggleFavoriteResponse } from '../types';
import { CreateTrailDto } from '../schemas';

const apiClient = new ApiClient();

const baseTrailsUrl = '/trails';

export const trailsApi = {
  get4RandomTrails: (): Promise<ITrailCard[]> => apiClient.get(`${baseTrailsUrl}/random`),

  createTrail: (trailData: CreateTrailDto): Promise<{ id: string }> =>
    apiClient.post(`${baseTrailsUrl}`, trailData),

  getTrail: (trailId: string): Promise<ITrail> => apiClient.get(`${baseTrailsUrl}/${trailId}`),

  deleteTrail: (trailId: string): Promise<void> => apiClient.delete(`${baseTrailsUrl}/${trailId}`),

  toggleFavoriteStatus: (
    trailId: string,
    data: ToggleFavoriteRequest
  ): Promise<ToggleFavoriteResponse> => apiClient.patch(`${baseTrailsUrl}/${trailId}/like`, data),
};
