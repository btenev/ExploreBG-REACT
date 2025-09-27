import { DestinationTypeEnum, IOwner, StatusEnum, TPhoto } from "../shared";

export interface IPlace {
  id: number;
  destinationName: string;
}

export interface IDestinationCard extends IPlace {
  imageUrl: string;
  nextTo: string;
  likedByUser: boolean;
}

export interface IDestination extends IDestinationCard {
  createdBy: IOwner;
  latitude: number;
  longitude: number;
  destinationInfo: string;
  type: DestinationTypeEnum;
  images: TPhoto[];
  detailsStatus: StatusEnum;
  lastUpdateDate: string;
}
