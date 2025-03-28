import { TReviewedBy } from '../reviewer';

export type TPhoto = {
  id: number;
  imageUrl: string;
  isMain: boolean;
  imageStatus?: string;
  reviewedBy?: TReviewedBy;
};
