import { ITrailCard } from '../types/trail';
import { ApiClient } from './apiClient';

const apiClient = new ApiClient();

const baseTrailsUrl = '/trails';

export const trailsApi = {
  get4RandomTrails: (token?: string) =>
    apiClient.get<ITrailCard[]>(`${baseTrailsUrl}/random`, token),
};
