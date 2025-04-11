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

export const usersApi = {
  getMyProfile: () => apiClient.get<MyProfileResponse>(`${baseUrl}/my-profile`),
};
