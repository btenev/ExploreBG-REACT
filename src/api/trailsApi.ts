import { ApiClient } from './apiClient';
import { ITrailCard } from '../types';
import { CreateTrailDto } from '../schemas';

const apiClient = new ApiClient();

const baseTrailsUrl = '/trails';

export const trailsApi = {
  get4RandomTrails: (): Promise<ITrailCard[]> => apiClient.get(`${baseTrailsUrl}/random`),

  createTrail: (trailData: CreateTrailDto): Promise<{ id: string }> =>
    apiClient.post(`${baseTrailsUrl}`, trailData),
};
