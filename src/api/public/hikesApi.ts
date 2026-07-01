import { ApiClient } from "@api/base";
import { ISelectableItem, UpdateItemsResponse } from "@api/public";
import { API_ROUTES } from "@constants";
import { CommentDataDto } from "@hooks/formHooks/commentHooks";
import { CreateHikeDto } from "@schemas/hike";
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
  trail: { items: { id: number }[] | [] };
};

export type HikeFieldResponseMap = {
  startPoint: { startPoint: string; lastUpdateDate: string };
  endPoint: { endPoint: string; lastUpdateDate: string };
  hikeDate: { hikeDate: string; lastUpdateDate: string };
  nextTo: { nextTo: string; lastUpdateDate: string };
  hikeInfo: { hikeInfo: string; lastUpdateDate: string };
  trail: UpdateItemsResponse<ISelectableItem>;
};

type AllHikesResponse = {
  content: IHikeCard[];
  totalElements: number;
};

const apiClient = new ApiClient();

export const hikesApi = {
  get4RandomHikes: (): Promise<IHikeCard[]> =>
    apiClient.get(API_ROUTES.hike.random),

  getHike: (hikeId: string): Promise<IHike> =>
    apiClient.get(API_ROUTES.hike.byId(hikeId)),

  createHike: (hikeData: CreateHikeDto): Promise<{ id: string }> =>
    apiClient.post(API_ROUTES.hike.root, hikeData),

  getAllHikes: (query: string): Promise<AllHikesResponse> => {
    return apiClient.get<AllHikesResponse>(`${API_ROUTES.hike.root}${query}`);
  },

  toggleFavoriteStatus: (
    hikeId: string,
    data: ToggleFavoriteRequest,
  ): Promise<ToggleFavoriteResponse> =>
    apiClient.patch(API_ROUTES.hike.like(hikeId), data),

  updateHikeField: <K extends keyof HikeFieldRequestMap>(
    field: K,
    trailId: number,
    data: HikeFieldRequestMap[K],
  ): Promise<HikeFieldResponseMap[K]> => {
    const endPoint = toKebabOrSpace(field as string);

    return apiClient.patch(
      `${API_ROUTES.hike.root}/${trailId}/${endPoint}`,
      data,
    );
  },

  getHikeComments: (hikeId: string): Promise<IComment[]> =>
    apiClient.get<IComment[]>(API_ROUTES.hike.comments(hikeId)),

  createHikeComment: (
    hikeId: string,
    data: CommentDataDto,
  ): Promise<IComment> =>
    apiClient.post(API_ROUTES.hike.comments(hikeId), data),

  deleteHikeComment: (hikeId: string, commentId: string): Promise<void> =>
    apiClient.delete(API_ROUTES.hike.deleteComment(hikeId, commentId)),
};
