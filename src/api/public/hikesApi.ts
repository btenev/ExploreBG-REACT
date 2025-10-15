import { PUBLIC_ROUTES } from "@constants";
import { CommentDataDto } from "@hooks/formHooks/commentHooks";
import {
  IComment,
  IHikeCard,
  ToggleFavoriteRequest,
  ToggleFavoriteResponse,
} from "@types";

import { ApiClient } from "../base";

const apiClient = new ApiClient();

export const hikesApi = {
  get4RandomHikes: (): Promise<IHikeCard[]> =>
    apiClient.get(PUBLIC_ROUTES.hike.random),

  toggleFavoriteStatus: (
    hikeId: string,
    data: ToggleFavoriteRequest
  ): Promise<ToggleFavoriteResponse> =>
    apiClient.patch(PUBLIC_ROUTES.hike.favoriteStatus(hikeId), data),

  getHikeComments: (hikeId: string): Promise<IComment[]> =>
    apiClient.get<IComment[]>(PUBLIC_ROUTES.hike.hikeComments(hikeId)),

  createHikeComment: (
    hikeId: string,
    data: CommentDataDto
  ): Promise<IComment> =>
    apiClient.post(PUBLIC_ROUTES.hike.hikeComments(hikeId), data),

  deleteHikeComment: (hikeId: string, commentId: string): Promise<void> =>
    apiClient.delete(PUBLIC_ROUTES.hike.deleteHikeComment(hikeId, commentId)),
};
