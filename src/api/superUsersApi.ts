import { IUser } from '../types/shared';

import { ApiClient } from './apiClient';

const apiClient = new ApiClient();

const baseUrl = '/super-users';

export const superUsersApi = {
  getAllUsers: (): Promise<IUser[]> => apiClient.get(`${baseUrl}/users`),
};
