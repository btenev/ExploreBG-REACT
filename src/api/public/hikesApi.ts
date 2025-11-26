import { ApiClient } from "@api/base";
import { PUBLIC_ROUTES } from "@constants";
import { CommentDataDto } from "@hooks/formHooks/commentHooks";
import {
  IComment,
  IHike,
  IHikeCard,
  ToggleFavoriteRequest,
  ToggleFavoriteResponse,
} from "@types";
import { toKebabOrSpace } from "@utils/mixedUtils";

export type HikeFieldRequestMap = {
  startPoint: { startPoint: string };
  endPoint: { endPoint: string };
  hikeDate: { hikeDate: string };
  nextTo: { nextTo: string };
  hikeInfo: { hikeInfo: string };
};

export type HikeFieldResponseMap = {
  startPoint: { startPoint: string; lastUpdateDate: string };
  endPoint: { endPoint: string; lastUpdateDate: string };
  hikeDate: { hikeDate: string; lastUpdateDate: string };
  nextTo: { nextTo: string; lastUpdateDate: string };
  hikeInfo: { hikeInfo: string; lastUpdateDate: string };
};

const apiClient = new ApiClient();

const baseHikesUrl = "/hikes";

export const hikesApi = {
  get4RandomHikes: (): Promise<IHikeCard[]> =>
    apiClient.get(PUBLIC_ROUTES.hike.random),

  getHike: (hikeId: string): Promise<IHike> =>
    apiClient.get(PUBLIC_ROUTES.hike.details.build(hikeId)),

  toggleFavoriteStatus: (
    hikeId: string,
    data: ToggleFavoriteRequest
  ): Promise<ToggleFavoriteResponse> =>
    apiClient.patch(PUBLIC_ROUTES.hike.favoriteStatus(hikeId), data),

  updateHikeField: <K extends keyof HikeFieldRequestMap>(
    field: K,
    trailId: number,
    data: HikeFieldRequestMap[K]
  ): Promise<HikeFieldResponseMap[K]> => {
    const endPoint = toKebabOrSpace(field as string);

    return apiClient.patch(`${baseHikesUrl}/${trailId}/${endPoint}`, data);
  },

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
