import { ApiClient } from './apiClient';
import { IDestinationCard, IPlace } from '../types';

const apiClient = new ApiClient();

const baseDestinationUrl = '/destinations';

export const destinationsApi = {
  get4RandomDestinations: (): Promise<IDestinationCard[]> =>
    apiClient.get(`${baseDestinationUrl}/random`),

  getAvailableDestinations: (): Promise<IPlace[]> => apiClient.get(`${baseDestinationUrl}/select`),
};
