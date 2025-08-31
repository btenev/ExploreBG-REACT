import { PUBLIC_ROUTES } from "@constants";
import { trailEnumsSchema } from "@schemas/trail";
import { registerEnumsSchema } from "@schemas/user";
import {
  DifficultyLevelEnum,
  GenderEnum,
  SeasonEnum,
  SuitableForEnum,
  WaterAvailabilityEnum,
} from "@types";
import { safeParseOrThrow } from "@utils/zodHelpers";

import { ApiClient } from "../base";

const apiClient = new ApiClient();

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
    const response = await apiClient.get<RegisterEnumsResponse>(
      PUBLIC_ROUTES.utilities.registerEnums
    );
    return safeParseOrThrow(
      registerEnumsSchema,
      response,
      "Failed to load gender options. Please try again later."
    );
  },

  getTrailEnums: async (): Promise<TrailEnumsResponse> => {
    const response = await apiClient.get<TrailEnumsResponse>(
      PUBLIC_ROUTES.utilities.trailEnums
    );
    return safeParseOrThrow(
      trailEnumsSchema,
      response,
      "Failed to load trail enums. Please try again later."
    );
  },
};
