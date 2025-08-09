import { StatusEnum } from '../enums';
import { TImagesForReview } from '../photo';
import { TReviewedBy } from '../reviewer';

export interface IWaitingApproval {
  id: number;
  name: string;
  detailsStatus: StatusEnum;
  destinationStatus?: string;
  accommodationStatus?: string;
  reviewedBy?: TReviewedBy;
  creationDate: string;
  images: TImagesForReview;
  gpxFile: {
    reviewedBy: TReviewedBy;
    gpxStatus: StatusEnum;
  };
}
