import { IHut } from '../accommodation';
import { IDestination } from '../destination';
import { IComment } from '../shared/comment';
import { IOwner } from '../shared/owner';
import { TPhoto } from '../shared/photo';

export interface ITrailCard {
  id: number;
  trailName: string;
  trailInfo: string;
  imageUrl: string;
  likedByUser: boolean;
}

export interface ITrail extends ITrailCard {
  createdBy: IOwner;
  startPoint: string;
  endPoint: string;
  totalDistance: number;
  seasonVisited: string;
  waterAvailable: string;
  availableHuts: IHut[];
  trailDifficulty: number;
  activity: string[];
  comments: IComment[];
  elevationGained: number;
  nextTo: string;
  destinations: IDestination[];
  images: TPhoto[];
  gpxFile: TGpxFile | null;
  lastUpdateDate: string;
  detailsStatus?: string;
}

export type TGpxFile = {
  id: number;
  gpxUrl: string;
  gpxStatus: string;
  creationDate: string;
};
