import { ApiClient } from './apiClient';
import { IHikeCard } from '../types/hike';

const apiClient = new ApiClient();

const baseHikeUrls = '/hikes';

export const hikesApi = {
  get4RandomHikes: (token?: string) =>
    apiClient.get<IHikeCard[]>(`${baseHikeUrls}/random`, token),
};
