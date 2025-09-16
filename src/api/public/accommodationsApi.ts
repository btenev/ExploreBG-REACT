import { PUBLIC_ROUTES } from "@constants";
import { CommentDataDto } from "@hooks/formHooks/commentHooks";
import {
  AccessibilityEnum,
  FoodAvailabilityEnum,
  IAccommodation,
  IAccommodationCard,
  IComment,
  IHut,
  ToggleFavoriteRequest,
  ToggleFavoriteResponse,
} from "@types";
import { toKebabCase } from "@utils/mixedUtils";
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
};

const apiClient = new ApiClient();

const baseAccommodationUrl = "/accommodations";

export const accommodationsApi = {
  get4RandomAccommodations: (): Promise<IAccommodationCard[]> =>
    apiClient.get(PUBLIC_ROUTES.accommodation.random),

  getAccommodation: async (
    accommodationId: string
  ): Promise<IAccommodation> => {
    try {
      const response = await apiClient.get<IAccommodation>(
        PUBLIC_ROUTES.accommodation.details.build(accommodationId)
      );
      const detailsStatus = detailsStatusConverter(response.detailsStatus);
      return { ...response, detailsStatus };
    } catch (error) {
      console.error("Error fetching accommodation:", error);
      throw new Error(
        "Failed to load accommodation due to invalid details status"
      );
    }
  },

  getAvailableAccommodations: (): Promise<IHut[]> =>
    apiClient.get(PUBLIC_ROUTES.accommodation.availableAccommodation),

  toggleFavoriteStatus: (
    accommodationId: string,
    data: ToggleFavoriteRequest
  ): Promise<ToggleFavoriteResponse> =>
    apiClient.patch(
      PUBLIC_ROUTES.accommodation.favoriteStatus(accommodationId),
      data
    ),

  updateAccommodationField: <K extends keyof AccommodationFieldRequestMap>(
    field: K,
    accommodationId: number,
    data: AccommodationFieldRequestMap[K]
  ): Promise<AccommodationFieldResponseMap[K]> => {
    const endPoint = toKebabCase(field as string);
    return apiClient.patch(
      `${baseAccommodationUrl}/${accommodationId}/${endPoint}`,
      data
    );
  },

  getAccommodationComments: (accommodationId: string): Promise<IComment[]> =>
    apiClient.get<IComment[]>(
      PUBLIC_ROUTES.accommodation.accommodationComments(accommodationId)
    ),

  createAccommodationComment: (
    accommodationId: string,
    data: CommentDataDto
  ): Promise<IComment> =>
    apiClient.post(
      PUBLIC_ROUTES.accommodation.accommodationComments(accommodationId),
      data
    ),

  deleteAccommodationComment: (
    accommodationsId: string,
    commentId: string
  ): Promise<void> =>
    apiClient.delete(
      PUBLIC_ROUTES.accommodation.deleteAccommodationComment(
        accommodationsId,
        commentId
      )
    ),
};
