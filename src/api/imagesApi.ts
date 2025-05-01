import { ApiClient } from './apiClient';

const apiClient = new ApiClient();

const baseUrl = '/images';

interface UserPhotoResponse {
  id: number;
  imageUrl: string;
}

export const imagesApi = {
  updateUserPhoto: (data: FormData): Promise<UserPhotoResponse> =>
    apiClient.patch(`${baseUrl}/user`, data, true),
};
