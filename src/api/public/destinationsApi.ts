import { API_ROUTES } from "@constants";
import { CommentDataDto } from "@hooks/formHooks/commentHooks";
import { CreateDestinationDto } from "@schemas/destination";
import {
  DestinationTypeEnum,
  IComment,
  IDestination,
  IDestinationCard,
  IPlace,
  ToggleFavoriteRequest,
  ToggleFavoriteResponse,
} from "@types";
import { toKebabOrSpace } from "@utils/mixedUtils";
import { detailsStatusConverter } from "@utils/statusConverter";

import { ApiClient } from "../base";

export type DestinationFieldRequestMap = {
  destinationName: { destinationName: string };
  type: { type: DestinationTypeEnum };
  location: { latitude: number | null; longitude: number | null };
  nextTo: { nextTo: string };
  destinationInfo: { destinationInfo: string };
};

export type DestinationFieldResponseMap = {
  destinationName: { destinationName: string; lastUpdateDate: string };
  type: { type: DestinationTypeEnum; lastUpdateDate: string };
  location: {
    latitude: number | null;
    longitude: number | null;
    lastUpdateDate: string;
  };
  nextTo: { nextTo: string; lastUpdateDate: string };
  destinationInfo: { destinationInfo: string; lastUpdateDate: string };
};

type AllDestinationsResponse = {
  content: IDestinationCard[];
  totalElements: number;
};

const apiClient = new ApiClient();

export const destinationsApi = {
  get4RandomDestinations: (): Promise<IDestinationCard[]> =>
    apiClient.get(API_ROUTES.destination.random),

  getDestination: async (destinationId: string): Promise<IDestination> => {
    try {
      const response = await apiClient.get<IDestination>(
        API_ROUTES.destination.byId(destinationId),
      );
      const detailsStatus = detailsStatusConverter(response.detailsStatus);
      return { ...response, detailsStatus };
    } catch (error) {
      console.error("Error fetching destination:", error);
      throw new Error(
        "Failed to load destination due to invalid details status",
      );
    }
  },

  createDestination: (
    destinationData: CreateDestinationDto,
  ): Promise<{ id: string }> =>
    apiClient.post(API_ROUTES.destination.root, destinationData),

  getAllDestinations: (query: string): Promise<AllDestinationsResponse> => {
    return apiClient.get<AllDestinationsResponse>(
      `${API_ROUTES.destination.root}${query}`,
    );
  },

  updateDestinationField: <K extends keyof DestinationFieldRequestMap>(
    field: K,
    destinationId: number,
    data: DestinationFieldRequestMap[K],
  ): Promise<DestinationFieldResponseMap[K]> => {
    const endPoint = toKebabOrSpace(field as string);
    return apiClient.patch(
      `${API_ROUTES.destination.root}/${destinationId}/${endPoint}`,
      data,
    );
  },

  updateMainDestinationPhoto: (
    destinationId: string,
    data: { imageId: string },
  ): Promise<{ imageId: number }> =>
    apiClient.patch(API_ROUTES.destination.mainImage(destinationId), data),

  getAvailableDestinations: (): Promise<IPlace[]> =>
    apiClient.get(API_ROUTES.destination.select),

  toggleFavoriteStatus: (
    destinationId: string,
    data: ToggleFavoriteRequest,
  ): Promise<ToggleFavoriteResponse> =>
    apiClient.patch(API_ROUTES.destination.like(destinationId), data),

  getDestinationComments: (destinationId: string): Promise<IComment[]> =>
    apiClient.get<IComment[]>(API_ROUTES.destination.comments(destinationId)),

  createDestinationComment: (
    destinationId: string,
    data: CommentDataDto,
  ): Promise<IComment> =>
    apiClient.post(API_ROUTES.destination.comments(destinationId), data),

  deleteDestinationComment: (
    destinationId: string,
    commentId: string,
  ): Promise<void> =>
    apiClient.delete(
      API_ROUTES.destination.deleteComment(destinationId, commentId),
    ),
};

/*
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

*/
