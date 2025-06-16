import { ApiClient } from './apiClient';
import {
  IAccommodationCard,
  IComment,
  IHut,
  ToggleFavoriteRequest,
  ToggleFavoriteResponse,
} from '../types';
import { CommentDataDto } from '../hooks/formHooks/useCommentForm';

const apiClient = new ApiClient();

const baseAccommodationUrl = '/accommodations';

export const accommodationsApi = {
  get4RandomAccommodations: (): Promise<IAccommodationCard[]> =>
    apiClient.get(`${baseAccommodationUrl}/random`),

  getAvailableAccommodations: (): Promise<IHut[]> =>
    apiClient.get(`${baseAccommodationUrl}/select`),

  toggleFavoriteStatus: (
    accommodationId: string,
    data: ToggleFavoriteRequest
  ): Promise<ToggleFavoriteResponse> =>
    apiClient.patch(`${baseAccommodationUrl}/${accommodationId}/like`, data),

  createAccommodationComment: (accommodationId: string, data: CommentDataDto): Promise<IComment> =>
    apiClient.post(`${baseAccommodationUrl}/${accommodationId}/comments`, data),
};
