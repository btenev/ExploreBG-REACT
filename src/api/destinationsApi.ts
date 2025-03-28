import { ApiClient } from './apiClient';
import { IDestinationCard } from '../types/destination';

const apiClient = new ApiClient();

const baseDestinationUrl = '/destinations';

export const destinationsApi = {
  get4RandomDestinations: (token?: string) =>
    apiClient.get<IDestinationCard[]>(`${baseDestinationUrl}/random`, token),
};
