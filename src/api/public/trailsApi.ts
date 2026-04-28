import { PUBLIC_ROUTES } from "@constants";
import { CommentDataDto } from "@hooks/formHooks/commentHooks";
import { CreateTrailDto } from "@schemas/trail";
import {
  DifficultyLevelEnum,
  IComment,
  ITrail,
  ITrailCard,
  SuitableForEnum,
  ToggleFavoriteRequest,
  ToggleFavoriteResponse,
  WaterAvailabilityEnum,
} from "@types";
import { toKebabOrSpace } from "@utils/mixedUtils";
import { detailsStatusConverter } from "@utils/statusConverter";

import { ApiClient } from "../base";

export interface ISelectableItem {
  id: number;
  name: string;
}

type UpdateItemsResponse<T> = {
  items: T[];
  lastUpdateDate: string;
};

type AllTrailsResponse = {
  content: ITrailCard[];
  totalElements: number;
};

export type HikingTraiFieldRequestMap = {
  startPoint: { startPoint: string };
  endPoint: { endPoint: string };
  totalDistance: { totalDistance: number | null };
  waterAvailability: { waterAvailability: WaterAvailabilityEnum };
  activity: { activity: SuitableForEnum[] };
  trailInfo: { trailInfo: string };
  elevationGained: { elevationGained: number | null };
  trailDifficulty: { trailDifficulty: DifficultyLevelEnum };
  availableHuts: { items: { id: number }[] | [] };
  destinations: { items: { id: number }[] | [] };
};

export type HikingTraiFieldResponseMap = {
  startPoint: { startPoint: string; lastUpdateDate: string };
  endPoint: { endPoint: string; lastUpdateDate: string };
  totalDistance: { totalDistance: number | null; lastUpdateDate: string };
  waterAvailability: {
    waterAvailability: WaterAvailabilityEnum;
    lastUpdateDate: string;
  };
  activity: { activity: SuitableForEnum[]; lastUpdateDate: string };
  trailInfo: { trailInfo: string; lastUpdateDate: string };
  elevationGained: { elevationGained: number | null; lastUpdateDate: string };
  trailDifficulty: {
    trailDifficulty: DifficultyLevelEnum;
    lastUpdateDate: string;
  };

  availableHuts: UpdateItemsResponse<ISelectableItem>;
  destinations: UpdateItemsResponse<ISelectableItem>;
};

const apiClient = new ApiClient();

const baseTrailsUrl = "/trails";

export const trailsApi = {
  get4RandomTrails: (): Promise<ITrailCard[]> =>
    apiClient.get(PUBLIC_ROUTES.trail.random),

  createTrail: (trailData: CreateTrailDto): Promise<{ id: string }> =>
    apiClient.post(PUBLIC_ROUTES.trail.create, trailData),

  getTrail: async (trailId: string): Promise<ITrail> => {
    try {
      const response = await apiClient.get<ITrail>(
        PUBLIC_ROUTES.trail.details.build(trailId),
      );
      const detailsStatus = detailsStatusConverter(response.detailsStatus);
      return { ...response, detailsStatus };
    } catch (error) {
      console.error("Error fetching trail:", error);
      throw new Error("Failed to load trail due to invalid details status");
    }
  },

  getAllTrails: (query: string): Promise<AllTrailsResponse> => {
    return apiClient.get<AllTrailsResponse>(`${baseTrailsUrl}${query}`);
  },

  deleteTrail: (trailId: string): Promise<void> =>
    apiClient.delete(PUBLIC_ROUTES.trail.details.build(trailId)),

  toggleFavoriteStatus: (
    trailId: string,
    data: ToggleFavoriteRequest,
  ): Promise<ToggleFavoriteResponse> =>
    apiClient.patch(PUBLIC_ROUTES.trail.favoriteTrail(trailId), data),

  updateHikingTrailField: <K extends keyof HikingTraiFieldRequestMap>(
    field: K,
    trailId: number,
    data: HikingTraiFieldRequestMap[K],
  ): Promise<HikingTraiFieldResponseMap[K]> => {
    const endPoint = toKebabOrSpace(field as string);

    return apiClient.patch(`${baseTrailsUrl}/${trailId}/${endPoint}`, data);
  },

  updateMainTrailPhoto: (
    trailId: string,
    data: { imageId: string },
  ): Promise<{ imageId: number }> =>
    apiClient.patch(PUBLIC_ROUTES.trail.updateMainTrailPhoto(trailId), data),

  getTrailComments: (trailId: string): Promise<IComment[]> =>
    apiClient.get<IComment[]>(PUBLIC_ROUTES.trail.trailComments(trailId)),

  createTrailComment: (
    trailId: string,
    data: CommentDataDto,
  ): Promise<IComment> =>
    apiClient.post(PUBLIC_ROUTES.trail.trailComments(trailId), data),

  deleteTrailComment: (trailId: string, commentId: string): Promise<void> =>
    apiClient.delete(
      PUBLIC_ROUTES.trail.deleteTrailComment(trailId, commentId),
    ),
};
