import { StatusEnum } from '../enums';
import { TReviewedBy } from '../reviewer';

export type TPhoto = {
  id: number;
  imageUrl: string;
  isMain: boolean;
  imageStatus?: StatusEnum;
  reviewedBy?: TReviewedBy;
};

export type TImagesForReview = {
  id: number;
  reviewedBy: TReviewedBy;
  image_status: StatusEnum;
}[];
