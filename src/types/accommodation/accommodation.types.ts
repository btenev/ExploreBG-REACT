import {
  AccessibilityEnum,
  AccommodationTypeEnum,
  FoodAvailabilityEnum,
  IOwner,
  StatusEnum,
  TPhoto,
} from "../shared";

export interface IHut {
  id: number;
  accommodationName: string;
}

export interface IAccommodationCard extends IHut {
  imageUrl: string | null;
  likedByUser?: boolean;
  createdById?: number;
}

export interface IAccommodation extends IAccommodationCard {
  createdBy: IOwner;
  phoneNumber: string | null;
  site: string | null;
  accommodationInfo: string;
  bedCapacity: number | null;
  pricePerBed: number | null;
  availableFood: FoodAvailabilityEnum;
  access: AccessibilityEnum;
  type: AccommodationTypeEnum;
  nextTo: string;
  images: TPhoto[];
  detailsStatus: StatusEnum;
  lastUpdateDate: string;
}
