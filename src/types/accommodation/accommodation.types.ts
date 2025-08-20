import {
  AccessibilityEnum,
  AccommodationTypeEnum,
  IComment,
  IOwner,
  StatusEnum,
  TPhoto,
} from '../shared';

export interface IHut {
  id: number;
  accommodationName: string;
}

export interface IAccommodationCard extends IHut {
  imageUrl: string;
  likedByUser: boolean;
}

export interface IAccommodation extends IAccommodationCard {
  createdBy: IOwner;
  phoneNumber: string;
  site: string;
  accommodationInfo: string;
  bedCapacity: number;
  pricePerBed: number;
  foodAvailable: boolean;
  access: AccessibilityEnum;
  type: AccommodationTypeEnum;
  nextTo: string;
  images: TPhoto[];
  comments: IComment[];
  detailsStatus: StatusEnum;
}
