import { ApiClient } from './apiClient';
import { ITrailCard } from '../types';

const apiClient = new ApiClient();

const baseTrailsUrl = '/trails';

export const trailsApi = {
  get4RandomTrails: () =>
    apiClient.get<ITrailCard[]>(`${baseTrailsUrl}/random`),
};
