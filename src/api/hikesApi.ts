import { ApiClient } from './apiClient';
import { IHikeCard } from '../types';

const apiClient = new ApiClient();

const baseHikeUrls = '/hikes';

export const hikesApi = {
  get4RandomHikes: () => apiClient.get<IHikeCard[]>(`${baseHikeUrls}/random`),
};
