import { CreateTrailDto, detailsStatusEnumSchema } from '../schemas';
import {
  DifficultyLevelEnum,
  IHut,
  IPlace,
  ITrail,
  ITrailCard,
  StatusEnum,
  SuitableForEnum,
  ToggleFavoriteRequest,
  ToggleFavoriteResponse,
  WaterAvailabilityEnum,
} from '../types';
import { toKebabCase } from '../utils/mixedUtils';
import { safeParseOrThrow } from '../utils/zodHelpers';
import { ApiClient } from './apiClient';

export type HikingTraiFieldRequestMap = {
  startPoint: { startPoint: string };
  endPoint: { endPoint: string };
  totalDistance: { totalDistance: number | null };
  waterAvailability: { waterAvailability: WaterAvailabilityEnum };
  activity: { activity: SuitableForEnum[] };
  trailInfo: { trailInfo: string };
  elevationGained: { elevationGained: number | null };
  trailDifficulty: { trailDifficulty: DifficultyLevelEnum };
  availableHuts: { availableHuts: { id: number }[] | [] };
  destinations: { destinations: { id: number }[] | [] };
};

export type HikingTraiFieldResponseMap = {
  startPoint: { startPoint: string; lastUpdateDate: string };
  endPoint: { endPoint: string; lastUpdateDate: string };
  totalDistance: { totalDistance: number | null; lastUpdateDate: string };
  waterAvailability: { waterAvailability: WaterAvailabilityEnum; lastUpdateDate: string };
  activity: { activity: SuitableForEnum[]; lastUpdateDate: string };
  trailInfo: { trailInfo: string; lastUpdateDate: string };
  elevationGained: { elevationGained: number | null; lastUpdateDate: string };
  trailDifficulty: { trailDifficulty: DifficultyLevelEnum; lastUpdateDate: string };
  availableHuts: { availableHuts: IHut[] | []; lastUpdateDate: string };
  destinations: { destinations: IPlace[] | []; lastUpdateDate: string };
};

const apiClient = new ApiClient();

const baseTrailsUrl = '/trails';

export const trailsApi = {
  get4RandomTrails: (): Promise<ITrailCard[]> => apiClient.get(`${baseTrailsUrl}/random`),

  createTrail: (trailData: CreateTrailDto): Promise<{ id: string }> =>
    apiClient.post(`${baseTrailsUrl}`, trailData),

  getTrail: async (trailId: string): Promise<ITrail> => {
    try {
      const response = await apiClient.get<ITrail>(`${baseTrailsUrl}/${trailId}`);
      const detailsStatus = detailsStatusConverter(response.detailsStatus);
      return { ...response, detailsStatus };
    } catch (error) {
      console.error('Error fetching trail:', error);
      throw new Error('Failed to load trail due to invalid details status');
    }
  },

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
    const endPoint = toKebabCase(field as string);

    return apiClient.patch(`${baseTrailsUrl}/${trailId}/${endPoint}`, data);
  },
};

const detailsStatusConverter = (detailsStatus: unknown): StatusEnum => {
  return safeParseOrThrow(
    detailsStatusEnumSchema,
    detailsStatus,
    `Invalid details status value: ${detailsStatus}`
  );
};
