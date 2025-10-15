import { StatusEnum } from "../enums";
import { TImagesForReview } from "../photo";
import { TReviewedBy } from "../reviewer";

export type EntityType = "trail" | "accommodation" | "destination" | "hike";
export type PhotoEntityType = Exclude<EntityType, "hike">;
export type LikeableEntityType = EntityType;
export type CommentEntityType = EntityType;
export type DeletableEntityType = EntityType;
export type CollectionType = `${PhotoEntityType}s`;

export interface IWaitingReviewEntity {
  id: number;
  name: string;
  detailsStatus: StatusEnum;
  creationDate: string;
  reviewedBy?: TReviewedBy;
  images: TImagesForReview;
}

export interface ITrailReview extends IWaitingReviewEntity {
  destinationStatus?: string;
  accommodationStatus?: string;
  gpxFile: {
    reviewedBy: TReviewedBy;
    gpxStatus: StatusEnum;
  };
}
