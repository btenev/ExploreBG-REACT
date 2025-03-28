import { IComment } from '../shared/comment';
import { IOwner } from '../shared/owner';
import { ITrail } from '../trail';

export interface IHikeCard {
  id: number;
  imageUrl: string;
  hikeDate: string;
  hikeInfo: string;
  hikeName: string;
}

export interface IHike extends IHikeCard {
  nextTo: string;
  owner: IOwner;
  hikingTrail: ITrail;
  comments: IComment[];
}
