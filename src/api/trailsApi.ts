import { ApiClient } from './apiClient';
import { ITrailCard } from '../types/trail';

const apiClient = new ApiClient();

const baseTrailsUrl = '/trails';

export const trailsApi = {
  get4RandomTrails: (token?: string) =>
    apiClient.get<ITrailCard[]>(`${baseTrailsUrl}/random`, token),
};
