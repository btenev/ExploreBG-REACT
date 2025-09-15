import { PUBLIC_ROUTES } from "@constants";
import { accommodationEnumsSchema } from "@schemas/accommodation";
import { trailEnumsSchema } from "@schemas/trail";
import { registerEnumsSchema } from "@schemas/user";
import {
  AccessibilityEnum,
  AccommodationTypeEnum,
  DifficultyLevelEnum,
  FoodAvailabilityEnum,
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

export interface AccommodationEnumResponse {
  type: AccommodationTypeEnum[];
  access: AccessibilityEnum[];
  availableFood: FoodAvailabilityEnum[];
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

  getAccommodationEnums: async (): Promise<AccommodationEnumResponse> => {
    const response = await apiClient.get<AccommodationEnumResponse>(
      PUBLIC_ROUTES.utilities.accommodationEnums
    );
    return safeParseOrThrow(
      accommodationEnumsSchema,
      response,
      "Failed to load accommodation enums. Please try again later."
    );
  },
};
