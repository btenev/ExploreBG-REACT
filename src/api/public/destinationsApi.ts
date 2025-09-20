import { PUBLIC_ROUTES } from "@constants";
import { CommentDataDto } from "@hooks/formHooks/commentHooks";
import {
  IComment,
  IDestination,
  IDestinationCard,
  IPlace,
  ToggleFavoriteRequest,
  ToggleFavoriteResponse,
} from "@types";
import { detailsStatusConverter } from "@utils/statusConverter";

import { ApiClient } from "../base";

const apiClient = new ApiClient();

export const destinationsApi = {
  get4RandomDestinations: (): Promise<IDestinationCard[]> =>
    apiClient.get(PUBLIC_ROUTES.destination.random),

  getDestination: async (destinationId: string): Promise<IDestination> => {
    try {
      const response = await apiClient.get<IDestination>(
        PUBLIC_ROUTES.destination.details.build(destinationId)
      );
      const detailsStatus = detailsStatusConverter(response.detailsStatus);
      return { ...response, detailsStatus };
    } catch (error) {
      console.error("Error fetching destination:", error);
      throw new Error(
        "Failed to load destination due to invalid details status"
      );
    }
  },

  updateMainDestinationPhoto: (
    destinationnId: string,
    data: { imageId: string }
  ): Promise<{ imageId: number }> =>
    apiClient.patch(
      PUBLIC_ROUTES.destination.updateMainDestinationPhoto(destinationnId),
      data
    ),

  getAvailableDestinations: (): Promise<IPlace[]> =>
    apiClient.get(PUBLIC_ROUTES.destination.availableDestination),

  toggleFavoriteStatus: (
    destinationId: string,
    data: ToggleFavoriteRequest
  ): Promise<ToggleFavoriteResponse> =>
    apiClient.patch(
      PUBLIC_ROUTES.destination.favoriteStatus(destinationId),
      data
    ),

  getDestinationComments: (destinationId: string): Promise<IComment[]> =>
    apiClient.get<IComment[]>(
      PUBLIC_ROUTES.destination.destinationComments(destinationId)
    ),

  createDestinationComment: (
    destinationId: string,
    data: CommentDataDto
  ): Promise<IComment> =>
    apiClient.post(
      PUBLIC_ROUTES.destination.destinationComments(destinationId),
      data
    ),

  deleteDestinationComment: (
    destinationId: string,
    commentId: string
  ): Promise<void> =>
    apiClient.delete(
      PUBLIC_ROUTES.destination.deleteDestinationComment(
        destinationId,
        commentId
      )
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
