import { ApiClient } from './apiClient';
import { IAccommodationCard } from '../types';

const apiClient = new ApiClient();

const baseAccommodationUrl = '/accommodations';

export const accommodationsApi = {
  get4RandomAccommodations: () =>
    apiClient.get<IAccommodationCard[]>(`${baseAccommodationUrl}/random`),
};
