import { ApiClient } from './apiClient';
import { IAccommodationCard, IHut, ToggleFavoriteRequest, ToggleFavoriteResponse } from '../types';

const apiClient = new ApiClient();

const baseAccommodationUrl = '/accommodations';

export const accommodationsApi = {
  get4RandomAccommodations: (): Promise<IAccommodationCard[]> =>
    apiClient.get(`${baseAccommodationUrl}/random`),

  getAvailableAccommodations: (): Promise<IHut[]> =>
    apiClient.get(`${baseAccommodationUrl}/select`),

  toggleFavoriteStatus: (
    accommodationId: string,
    data: ToggleFavoriteRequest
  ): Promise<ToggleFavoriteResponse> =>
    apiClient.patch(`${baseAccommodationUrl}/${accommodationId}/like`, data),
};
