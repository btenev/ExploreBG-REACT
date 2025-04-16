import { IHikeCard, ITrailCard } from '../types';

import { ApiClient } from './apiClient';
import { GenderEnum } from '../types';
import { safeParseOrThrow } from '../utils/zodHelpers';
import { genderEnumSchema } from '../schemas';

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

export type UserPatchMap = {
  username: { username: string };
  email: { email: string };
  birthdate: { birthdate: string | null };
  gender: { gender: GenderEnum };
  userInfo: { userInfo: string | null };
};

export const usersApi = {
  getMyProfile: async () => {
    try {
      const response = await apiClient.get<MyProfileResponse>(`${baseUrl}/my-profile`);
      const gender = genderConverter(response.gender);
      return { ...response, gender };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Failed to load profile due to invalid gender');
    }
  },

  updateUserField: <K extends keyof UserPatchMap>(field: K, data: UserPatchMap[K]) => {
    const endpoint = field === 'userInfo' ? 'user-info' : field;
    return apiClient.patch<UserPatchMap[K]>(`${baseUrl}/${endpoint}`, data);
  },
};

const genderConverter = (gender: unknown): GenderEnum => {
  return safeParseOrThrow(genderEnumSchema, gender, `Invalid gender value: ${gender}`);
};
