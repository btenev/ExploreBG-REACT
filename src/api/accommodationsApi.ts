import { ApiClient } from './apiClient';
import {
  IAccommodationCard,
  IComment,
  IHut,
  ToggleFavoriteRequest,
  ToggleFavoriteResponse,
} from '../types';
import { CommentDataDto } from '../hooks/formHooks/useCommentForm';
import { PUBLIC_ROUTES } from '../constants';

const apiClient = new ApiClient();

export const accommodationsApi = {
  get4RandomAccommodations: (): Promise<IAccommodationCard[]> =>
    apiClient.get(PUBLIC_ROUTES.accommodation.random),

  getAvailableAccommodations: (): Promise<IHut[]> =>
    apiClient.get(PUBLIC_ROUTES.accommodation.availableAccommodation),

  toggleFavoriteStatus: (
    accommodationId: string,
    data: ToggleFavoriteRequest
  ): Promise<ToggleFavoriteResponse> =>
    apiClient.patch(PUBLIC_ROUTES.accommodation.favoriteStatus(accommodationId), data),

  getAccommodationComments: (accommodationId: string): Promise<IComment[]> =>
    apiClient.get<IComment[]>(PUBLIC_ROUTES.accommodation.accommodationComments(accommodationId)),

  createAccommodationComment: (accommodationId: string, data: CommentDataDto): Promise<IComment> =>
    apiClient.post(PUBLIC_ROUTES.accommodation.accommodationComments(accommodationId), data),

  deleteAccommodationComment: (accommodationsId: string, commentId: string): Promise<void> =>
    apiClient.delete(
      PUBLIC_ROUTES.accommodation.deleteAccommodationComment(accommodationsId, commentId)
    ),
};
