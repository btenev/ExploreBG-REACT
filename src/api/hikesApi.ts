import { ApiClient } from './apiClient';
import { IHikeCard } from '../types';
import { PUBLIC_ROUTES } from '../constants';

const apiClient = new ApiClient();

export const hikesApi = {
  get4RandomHikes: (): Promise<IHikeCard[]> => apiClient.get(PUBLIC_ROUTES.hike.random),
};
