import { PUBLIC_ROUTES } from "@constants";
import { accommodationEnumsSchema } from "@schemas/accommodation";
import { destinationEnumsSchema } from "@schemas/destination";
import { trailEnumsSchema } from "@schemas/trail";
import { registerEnumsSchema } from "@schemas/user";
import {
  AccessibilityEnum,
  AccommodationTypeEnum,
  DestinationTypeEnum,
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

export interface DestinationEnumsResponse {
  type: DestinationTypeEnum[];
}

export const utilitiesApi = {
  getGenderEnum: async (): Promise<RegisterEnumsResponse> => {
    const response = await apiClient.get<RegisterEnumsResponse>(
      PUBLIC_ROUTES.utilities.registerEnums
    );

    const parsed = safeParseOrThrow(
      registerEnumsSchema,
      response,
      "Failed to load gender options. Please try again later."
    );

    return { gender: parsed.gender ?? [] };
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

  getDestinationEnums: async (): Promise<DestinationEnumsResponse> => {
    const response = await apiClient.get<DestinationEnumsResponse>(
      PUBLIC_ROUTES.utilities.destinationEnums
    );
    return safeParseOrThrow(
      destinationEnumsSchema,
      response,
      "Failed to load destination enums. Please try again later."
    );
  },
};
