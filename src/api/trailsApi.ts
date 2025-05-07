import { ApiClient } from './apiClient';
import {
  DifficultyLevelEnum,
  ITrail,
  ITrailCard,
  SuitableForEnum,
  ToggleFavoriteRequest,
  ToggleFavoriteResponse,
  WaterAvailabilityEnum,
} from '../types';
import { CreateTrailDto } from '../schemas';

export type HikingTraiFieldRequestMap = {
  startPoint: { startPoint: string };
  endPoint: { endPoint: string };
  totalDistance: { totalDistance: string };
  waterAvailable: { waterAvailable: WaterAvailabilityEnum };
  activity: { activity: SuitableForEnum[] };
  trailInfo: { trailInfo: string };
  elevationGained: { elevationGained: number };
  trailDifficulty: { trailDifficulty: DifficultyLevelEnum };
  availableHuts: { availableHuts: { id: number }[] };
  destinations: { destinations: { id: number }[] };
};

export type HikingTraiFieldResponseMap = {
  startPoint: { startPoint: string; lastUpdateDate: string };
  endPoint: { endPoint: string; lastUpdateDate: string };
  totalDistance: { totalDistance: string; lastUpdateDate: string };
  waterAvailable: { waterAvailable: WaterAvailabilityEnum };
  activity: { activity: SuitableForEnum[] };
  trailInfo: { trailInfo: string };
  elevationGained: { elevationGained: number };
  trailDifficulty: { trailDifficulty: DifficultyLevelEnum };
  availableHuts: { availableHuts: { id: number }[] };
  destinations: { destinations: { id: number }[] };
};

const apiClient = new ApiClient();

const baseTrailsUrl = '/trails';

export const trailsApi = {
  get4RandomTrails: (): Promise<ITrailCard[]> => apiClient.get(`${baseTrailsUrl}/random`),

  createTrail: (trailData: CreateTrailDto): Promise<{ id: string }> =>
    apiClient.post(`${baseTrailsUrl}`, trailData),

  getTrail: (trailId: string): Promise<ITrail> => apiClient.get(`${baseTrailsUrl}/${trailId}`),

  deleteTrail: (trailId: string): Promise<void> => apiClient.delete(`${baseTrailsUrl}/${trailId}`),

  toggleFavoriteStatus: (
    trailId: string,
    data: ToggleFavoriteRequest
  ): Promise<ToggleFavoriteResponse> => apiClient.patch(`${baseTrailsUrl}/${trailId}/like`, data),

  updateHikingTrailField: <K extends keyof HikingTraiFieldRequestMap>(
    field: K,
    trailId: number,
    data: HikingTraiFieldRequestMap[K]
  ): Promise<HikingTraiFieldResponseMap[K]> => {
    const fieldMapper = {
      startPoint: 'start-point',
      endPoint: 'end-point',
      totalDistance: 'total-distance',
      waterAvailable: 'water-available',
      trailInfo: 'trail-info',
      elevationGained: 'elevation-gained',
      trailDifficulty: 'trail-difficulty',
      availableHuts: 'available-huts',
    };

    return apiClient.patch(
      `${baseTrailsUrl}/${trailId}/${fieldMapper[field as keyof typeof fieldMapper]}`,
      data
    );
  },
};
