import { IHikeCard, ITrailCard } from '../types';
import { GenderEnum } from '../types';

import { genderEnumSchema } from '../schemas';
import { safeParseOrThrow } from '../utils/zodHelpers';
import { ApiClient } from './apiClient';
import { PUBLIC_ROUTES } from '../constants';

const apiClient = new ApiClient();
const baseUrl = '/users';

interface MyProfileResponse {
  id: number;
  username: string;
  email: string;
  gender: GenderEnum;
  birthdate: string;
  imageUrl: string;
  userInfo: string;
  createdHikes: IHikeCard[];
  createdTrails: ITrailCard[];
}

export type UserFieldRequestMap = {
  username: { username: string };
  email: { email: string };
  birthdate: { birthdate: string | null };
  gender: { gender: GenderEnum };
  userInfo: { userInfo: string | null };
  password: { currentPassword: string; newPassword: string; confirmNewPassword: string };
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
  getMyProfile: async (): Promise<MyProfileResponse> => {
    try {
      const response = await apiClient.get<MyProfileResponse>(PUBLIC_ROUTES.user.myProfile);
      const gender = genderConverter(response.gender);
      return { ...response, gender };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Failed to load profile due to invalid gender');
    }
  },

  getUserProfile: async (userId: string): Promise<MyProfileResponse> => {
    try {
      const response = await apiClient.get<MyProfileResponse>(
        PUBLIC_ROUTES.user.getProfile.build(userId)
      );
      const gender = genderConverter(response.gender);
      return { ...response, gender };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Failed to load profile due to invalid gender');
    }
  },

  updateUserField: <K extends keyof UserFieldRequestMap>(
    field: K,
    data: UserFieldRequestMap[K]
  ): Promise<UserFieldResponseMap[K]> => {
    const endpoint = field === 'userInfo' ? 'user-info' : field;
    return apiClient.patch(`${baseUrl}/${endpoint}`, data);
  },
};

const genderConverter = (gender: unknown): GenderEnum => {
  return safeParseOrThrow(genderEnumSchema, gender, `Invalid gender value: ${gender}`);
};
