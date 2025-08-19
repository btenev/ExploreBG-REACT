import { ApiClient } from './apiClient';
import {
  IAccommodation,
  IAccommodationCard,
  IComment,
  IHut,
  ToggleFavoriteRequest,
  ToggleFavoriteResponse,
} from '../types';
import { CommentDataDto } from '../hooks/formHooks/useCommentForm';
import { PUBLIC_ROUTES } from '../constants';
import { detailsStatusConverter } from '../utils/statusConverter';

const apiClient = new ApiClient();

export const accommodationsApi = {
  get4RandomAccommodations: (): Promise<IAccommodationCard[]> =>
    apiClient.get(PUBLIC_ROUTES.accommodation.random),

  getAccommodation: async (trailId: string): Promise<IAccommodation> => {
    try {
      const response = await apiClient.get<IAccommodation>(
        PUBLIC_ROUTES.trail.details.build(trailId)
      );
      const detailsStatus = detailsStatusConverter(response.detailsStatus);
      return { ...response, detailsStatus };
    } catch (error) {
      console.error('Error fetching accommodation:', error);
      throw new Error('Failed to load accommodation due to invalid details status');
    }
  },

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
