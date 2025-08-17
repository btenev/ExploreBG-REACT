import { PUBLIC_ROUTES } from '../constants';
import { ApiClient } from './apiClient';

const apiClient = new ApiClient();

interface UserPhotoResponse {
  id: number;
  imageUrl: string;
}

export const imagesApi = {
  updateUserPhoto: (data: FormData): Promise<UserPhotoResponse> =>
    apiClient.patch(PUBLIC_ROUTES.image.updateUserPhoto, data, true),

  deleteEntityPhotos: (
    entityId: string,
    photos: { folder: string; ids: number[] }
  ): Promise<void> => apiClient.delete(PUBLIC_ROUTES.image.deleteEntityPhotos(entityId), photos),

  uploadEntityPhotos: (
    entityId: string,
    photos: FormData
  ): Promise<{ id: number; imageUrl: string; isMain: boolean }[]> =>
    apiClient.patch(PUBLIC_ROUTES.image.deleteEntityPhotos(entityId), photos, true),
};
