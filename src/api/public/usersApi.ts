import { PUBLIC_ROUTES } from "@constants";
import { genderEnumSchema } from "@schemas/user";
import {
  IHikeCard,
  ITrailCard,
  GenderEnum,
  IAccommodationCard,
  IDestinationCard,
} from "@types";
import { safeParseOrThrow } from "@utils/zodHelpers";

import { ApiClient } from "../base";

const apiClient = new ApiClient();
const baseUrl = "/users";

interface UserProfileResponse {
  id: number;
  username: string;
  gender: GenderEnum;
  birthdate: string | null;
  imageUrl: string | null;
  userInfo: string | null;
  createdHikes: IHikeCard[];
  createdTrails: ITrailCard[];
  createdAccommodations: IAccommodationCard[];
  createdDestinations: IDestinationCard[];
}

interface UserOwnProfileResponse {
  id: number;
  username: string;
  email: string;
  gender: GenderEnum;
  birthdate: string | null;
  imageUrl: string | null;
  userInfo: string | null;
  createdHikes: IHikeCard[];
  createdTrails: ITrailCard[];
  createdAccommodations: IAccommodationCard[];
  createdDestinations: IDestinationCard[];
}

export type UserFieldRequestMap = {
  username: { username: string };
  birthdate: { birthdate: string | null };
  gender: { gender: GenderEnum };
  userInfo: { userInfo: string | null };
  password: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
};

export type UserFieldResponseMap = {
  username: { username: string };
  email: { email: string };
  birthdate: { birthdate: string | null };
  gender: { gender: GenderEnum };
  userInfo: { userInfo: string | null };
  password: { message: string };
};

export const usersApi = {
  getMyProfile: async (): Promise<UserOwnProfileResponse> => {
    try {
      const response = await apiClient.get<UserOwnProfileResponse>(
        PUBLIC_ROUTES.user.myProfile
      );
      const gender = genderConverter(response.gender);
      return { ...response, gender };
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw new Error("Failed to load profile due to invalid gender");
    }
  },

  getUserProfile: async (userId: string): Promise<UserProfileResponse> => {
    try {
      const response = await apiClient.get<UserProfileResponse>(
        PUBLIC_ROUTES.user.getProfile.build(userId)
      );
      const gender = genderConverter(response.gender);
      return { ...response, gender };
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw new Error("Failed to load profile due to invalid gender");
    }
  },

  updateUserField: <K extends keyof UserFieldRequestMap>(
    field: K,
    data: UserFieldRequestMap[K]
  ): Promise<UserFieldResponseMap[K]> => {
    const endpoint = field === "userInfo" ? "user-info" : field;
    return apiClient.patch(`${baseUrl}/${endpoint}`, data);
  },
};

const genderConverter = (gender: unknown): GenderEnum => {
  return safeParseOrThrow(
    genderEnumSchema,
    gender,
    `Invalid gender value: ${gender}`
  );
};
