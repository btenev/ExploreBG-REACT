import { IComment } from "../shared/comment";
import { IOwner } from "../shared/owner";
import { ITrail } from "../trail";

export interface IHikeCard {
  id: number;
  imageUrl: string | null;
  hikeDate: string;
  hikeInfo: string;
  hikeName: string;
  createdById?: number;
  likedByUser?: boolean;
}

export interface IHike extends IHikeCard {
  startPoint: string;
  endPoint: string;
  nextTo: string;
  createdBy: IOwner;
  hikingTrail: ITrail | null;
  comments: IComment[];
}
