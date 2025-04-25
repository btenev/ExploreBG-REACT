import { ApiClient } from './apiClient';
import { IDestinationCard, IPlace } from '../types';

const apiClient = new ApiClient();

const baseDestinationUrl = '/destinations';

export const destinationsApi = {
  get4RandomDestinations: () => apiClient.get<IDestinationCard[]>(`${baseDestinationUrl}/random`),

  getAvailableDestinations: () => apiClient.get<IPlace[]>(`${baseDestinationUrl}/select`),
};
