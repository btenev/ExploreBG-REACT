import { ApiClient } from './apiClient';
import { IAccommodationCard, IHut } from '../types';

const apiClient = new ApiClient();

const baseAccommodationUrl = '/accommodations';

export const accommodationsApi = {
  get4RandomAccommodations: (): Promise<IAccommodationCard[]> =>
    apiClient.get(`${baseAccommodationUrl}/random`),

  getAvailableAccommodations: (): Promise<IHut[]> =>
    apiClient.get(`${baseAccommodationUrl}/select`),
};
