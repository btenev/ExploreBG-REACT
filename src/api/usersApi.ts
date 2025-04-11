import { IHikeCard, ITrailCard } from '../types';

import { ApiClient } from './apiClient';

const apiClient = new ApiClient();
const baseUrl = '/users';

interface MyProfileResponse {
  id: number;
  email: string;
  gender: string;
  birthdate: string;
  imageUrl: string;
  userInfo: string;
  createdHikes: IHikeCard[];
  createdTrails: ITrailCard[];
}

export type UserPatchMap = {
  username: { username: string };
  email: { email: string };
  bithdate: { birthdate: string };
  gender: { gender: 'Male' | 'Female' };
  userInfo: { userInfo: string };
};

export const usersApi = {
  getMyProfile: () => apiClient.get<MyProfileResponse>(`${baseUrl}/my-profile`),

  updateUserField: <K extends keyof UserPatchMap>(field: K, data: UserPatchMap[K]) =>
    apiClient.patch<UserPatchMap[K]>(`${baseUrl}/${field}`, data),
};
