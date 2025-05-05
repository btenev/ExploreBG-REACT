import { ApiClient } from './apiClient';
import { IDestinationCard, IPlace, ToggleFavoriteRequest, ToggleFavoriteResponse } from '../types';

const apiClient = new ApiClient();

const baseDestinationUrl = '/destinations';

export const destinationsApi = {
  get4RandomDestinations: (): Promise<IDestinationCard[]> =>
    apiClient.get(`${baseDestinationUrl}/random`),

  getAvailableDestinations: (): Promise<IPlace[]> => apiClient.get(`${baseDestinationUrl}/select`),

  toggleFavoriteStatus: (
    destinationId: string,
    data: ToggleFavoriteRequest
  ): Promise<ToggleFavoriteResponse> =>
    apiClient.patch(`${baseDestinationUrl}/${destinationId}/like`, data),
};
