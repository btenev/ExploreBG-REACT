import { API_ROUTES } from "@constants";
import { CommentDataDto } from "@hooks/formHooks/commentHooks";
import { CreateAccommodationDto } from "@schemas/accommodation";
import {
  AccessibilityEnum,
  AccommodationTypeEnum,
  FoodAvailabilityEnum,
  IAccommodation,
  IAccommodationCard,
  IComment,
  IHut,
  ToggleFavoriteRequest,
  ToggleFavoriteResponse,
} from "@types";
import { toKebabOrSpace } from "@utils/mixedUtils";
import { detailsStatusConverter } from "@utils/statusConverter";

import { ApiClient } from "../base";

export type AccommodationFieldRequestMap = {
  accommodationName: { accommodationName: string };
  site: { site: string | null };
  phoneNumber: { phoneNumber: string | null };
  bedCapacity: { bedCapacity: number | null };
  pricePerBed: { pricePerBed: number | null };
  availableFood: { availableFood: FoodAvailabilityEnum };
  access: { access: AccessibilityEnum };
  nextTo: { nextTo: string };
  accommodationInfo: { accommodationInfo: string };
  type: { type: AccommodationTypeEnum };
};

export type AccommodationFieldResponseMap = {
  accommodationName: { accommodationName: string; lastUpdateDate: string };
  site: { site: string; lastUpdateDate: string };
  phoneNumber: { phoneNumber: string; lastUpdateDate: string };
  bedCapacity: { bedCapacity: number | null; lastUpdateDate: string };
  pricePerBed: { pricePerBed: number | null; lastUpdateDate: string };
  availableFood: {
    availableFood: FoodAvailabilityEnum;
    lastUpdateDate: string;
  };
  access: { access: AccessibilityEnum; lastUpdateDate: string };
  nextTo: { nextTo: string; lastUpdateDate: string };
  accommodationInfo: { accommodationInfo: string; lastUpdateDate: string };
  type: { type: AccommodationTypeEnum; lastUpdateDate: string };
};

type AllAccommodationsResponse = {
  content: IAccommodationCard[];
  totalElements: number;
};

const apiClient = new ApiClient();

export const accommodationsApi = {
  get4RandomAccommodations: (): Promise<IAccommodationCard[]> =>
    apiClient.get(API_ROUTES.accommodation.random),

  createAccommodation: (
    accommodationData: CreateAccommodationDto,
  ): Promise<{ id: string }> =>
    apiClient.post(API_ROUTES.accommodation.root, accommodationData),

  getAccommodation: async (
    accommodationId: string,
  ): Promise<IAccommodation> => {
    try {
      const response = await apiClient.get<IAccommodation>(
        API_ROUTES.accommodation.byId(accommodationId),
      );
      const detailsStatus = detailsStatusConverter(response.detailsStatus);
      return { ...response, detailsStatus };
    } catch (error) {
      console.error("Error fetching accommodation:", error);
      throw new Error(
        "Failed to load accommodation due to invalid details status",
      );
    }
  },

  getAllAccommodations: (query: string): Promise<AllAccommodationsResponse> => {
    return apiClient.get<AllAccommodationsResponse>(
      `${API_ROUTES.accommodation.root}${query}`,
    );
  },

  getAvailableAccommodations: (): Promise<IHut[]> =>
    apiClient.get(API_ROUTES.accommodation.select),

  toggleFavoriteStatus: (
    accommodationId: string,
    data: ToggleFavoriteRequest,
  ): Promise<ToggleFavoriteResponse> =>
    apiClient.patch(API_ROUTES.accommodation.like(accommodationId), data),

  updateAccommodationField: <K extends keyof AccommodationFieldRequestMap>(
    field: K,
    accommodationId: number,
    data: AccommodationFieldRequestMap[K],
  ): Promise<AccommodationFieldResponseMap[K]> => {
    const endPoint = toKebabOrSpace(field as string);
    return apiClient.patch(
      `${API_ROUTES.accommodation.root}/${accommodationId}/${endPoint}`,
      data,
    );
  },

  updateMainAccommodationPhoto: (
    accommodationId: string,
    data: { imageId: string },
  ): Promise<{ imageId: number }> =>
    apiClient.patch(API_ROUTES.accommodation.mainImage(accommodationId), data),

  getAccommodationComments: (accommodationId: string): Promise<IComment[]> =>
    apiClient.get<IComment[]>(
      API_ROUTES.accommodation.comments(accommodationId),
    ),

  createAccommodationComment: (
    accommodationId: string,
    data: CommentDataDto,
  ): Promise<IComment> =>
    apiClient.post(API_ROUTES.accommodation.comments(accommodationId), data),

  deleteAccommodationComment: (
    accommodationsId: string,
    commentId: string,
  ): Promise<void> =>
    apiClient.delete(
      API_ROUTES.accommodation.deleteComment(accommodationsId, commentId),
    ),
};
