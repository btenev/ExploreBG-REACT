import { ApiClient } from './apiClient';
import {
  IComment,
  IDestinationCard,
  IPlace,
  ToggleFavoriteRequest,
  ToggleFavoriteResponse,
} from '../types';
import { CommentDataDto } from '../hooks/formHooks/useCommentForm';

const apiClient = new ApiClient();

const baseDestinationUrl = '/destinations';

export const destinationsApi = {
  get4RandomDestinations: (): Promise<IDestinationCard[]> =>
    apiClient.get(`${baseDestinationUrl}/random`),

  getAvailableDestinations: (): Promise<IPlace[]> => apiClient.get(`${baseDestinationUrl}/select`),

  toggleFavoriteStatus: (
    destinationId: string,
    data: ToggleFavoriteRequest
  ): Promise<ToggleFavoriteResponse> =>
    apiClient.patch(`${baseDestinationUrl}/${destinationId}/like`, data),

  getDestinationComments: (destinationId: string): Promise<IComment[]> =>
    apiClient.get<IComment[]>(`${baseDestinationUrl}/${destinationId}/comments`),

  createDestinationComment: (destinationId: string, data: CommentDataDto): Promise<IComment> =>
    apiClient.post(`${baseDestinationUrl}/${destinationId}/comments`, data),

  deleteDestinationComment: (destinationId: string, commentId: string): Promise<void> =>
    apiClient.delete(`${baseDestinationUrl}/${destinationId}/comments/${commentId}`),
};
