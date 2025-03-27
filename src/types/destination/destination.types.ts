import { IComment } from '../shared/comment';

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
  type: string;
  comments: IComment[];
}
