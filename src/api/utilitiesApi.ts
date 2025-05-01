import { registerEnumsSchema } from '../schemas/genderEnumSchema';
import { trailEnumsSchema } from '../schemas/trailEnumsSchema';
import {
  DifficultyLevelEnum,
  GenderEnum,
  SeasonEnum,
  SuitableForEnum,
  WaterAvailabilityEnum,
} from '../types';
import { safeParseOrThrow } from '../utils/zodHelpers';
import { ApiClient } from './apiClient';

const apiClient = new ApiClient();
const baseUrl = '/utilities';

export interface RegisterEnumsResponse {
  gender: GenderEnum[];
}

export interface TrailEnumsResponse {
  seasonVisited: SeasonEnum[];
  waterAvailability: WaterAvailabilityEnum[];
  trailDifficulty: DifficultyLevelEnum[];
  activity: SuitableForEnum[];
}

export const utilitiesApi = {
  getGenderEnum: async (): Promise<RegisterEnumsResponse> => {
    const response = await apiClient.get<RegisterEnumsResponse>(`${baseUrl}/register-enums`);
    return safeParseOrThrow(
      registerEnumsSchema,
      response,
      'Failed to load gender options. Please try again later.'
    );
  },

  getTrailEnums: async (): Promise<TrailEnumsResponse> => {
    const response = await apiClient.get<TrailEnumsResponse>(`${baseUrl}/create/trail-enums`);
    return safeParseOrThrow(
      trailEnumsSchema,
      response,
      'Failed to load trail enums. Please try again later.'
    );
  },
};
