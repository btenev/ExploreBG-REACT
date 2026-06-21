import { IComment } from "../shared/comment";
import { IOwner } from "../shared/owner";
import { ITrailIdentifier } from "../trail";

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
  lastUpdateDate: string;
  trail: ITrailIdentifier | null;
  comments: IComment[];
}
