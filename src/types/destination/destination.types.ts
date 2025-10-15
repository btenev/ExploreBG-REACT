import { DestinationTypeEnum, IOwner, StatusEnum, TPhoto } from "../shared";

export interface IPlace {
  id: number;
  destinationName: string;
}

export interface IDestinationCard extends IPlace {
  imageUrl: string | null;
  nextTo: string;
  likedByUser?: boolean;
  createdById?: number;
}

export interface IDestination extends IDestinationCard {
  createdBy: IOwner;
  latitude: number | null;
  longitude: number | null;
  destinationInfo: string;
  nextTo: string;
  type: DestinationTypeEnum;
  images: TPhoto[];
  detailsStatus: StatusEnum;
  lastUpdateDate: string;
}
