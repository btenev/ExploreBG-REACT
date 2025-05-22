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

  deleteEntityPhotos: (
    entityId: string,
    photos: { folder: string; ids: number[] }
  ): Promise<void> => apiClient.delete(`${baseUrl}/entity/${entityId}`, photos),

  uploadEntityPhotos: (
    entityId: string,
    photos: FormData
  ): Promise<{ id: number; imageUrl: string; isMain: boolean }[]> =>
    apiClient.patch(`${baseUrl}/entity/${entityId}`, photos, true),
};
