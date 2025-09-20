import { DestinationTypeEnum, StatusEnum, TPhoto } from "../shared";

export interface IPlace {
  id: number;
  destinationName: string;
}

export interface IDestinationCard extends IPlace {
  imageUrl: string;
  nextTo: string;
}

export interface IDestination extends IDestinationCard {
  location: string;
  destinationInfo: string;
  type: DestinationTypeEnum;
  images: TPhoto[];
  detailsStatus: StatusEnum;
  lastUpdateDate: string;
}
