import { ApiClient } from './apiClient';
import { IAccommodationCard } from '../types/accommodation';

const apiClient = new ApiClient();

const baseAccommodationUrl = '/accommodations';

export const accommodationsApi = {
  get4RandomAccommodations: (token?: string) =>
    apiClient.get<IAccommodationCard[]>(
      `${baseAccommodationUrl}/random`,
      token
    ),
};
