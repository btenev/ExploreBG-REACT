import { TImagesForReview } from '../photo';
import { TReviewedBy } from '../reviewer';

export type EntityType = 'trail' | 'accommodation' | 'destination';
export type CollectionType = `${EntityType}s`;

export interface IWaitingReviewEntity {
  id: number;
  name: string;
  detailsStatus: string;
  creationDate: string;
  reviewedBy?: TReviewedBy;
  images: TImagesForReview;
}

export interface ITrailReview extends IWaitingReviewEntity {
  destinationStatus?: string;
  accommodationStatus?: string;
  gpxFile: {
    reviewedBy: TReviewedBy;
    gpxStatus: string;
  };
}
