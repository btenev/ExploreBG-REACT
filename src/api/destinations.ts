import ApiClient from './apiClient';
import { IDestinationCard } from '../types/destination';

const apiClient = new ApiClient();

const baseDestinationUrl = '/destinations';

const apiDestination = {
  get4RandomDestinations: (token?: string) =>
    apiClient.get<IDestinationCard[]>(`${baseDestinationUrl}/random`, token),
};

export default apiDestination;
