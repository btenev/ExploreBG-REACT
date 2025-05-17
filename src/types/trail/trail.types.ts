import { IHut } from '../accommodation';
import { IDestination } from '../destination';

import {
  DifficultyLevelEnum,
  SeasonEnum,
  StatusEnum,
  SuitableForEnum,
  WaterAvailabilityEnum,
} from '../shared';

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
  seasonVisited: SeasonEnum;
  waterAvailability: WaterAvailabilityEnum;
  availableHuts: IHut[];
  trailDifficulty: DifficultyLevelEnum;
  activity: SuitableForEnum[];
  comments: IComment[];
  elevationGained: number;
  nextTo: string;
  destinations: IDestination[];
  images: TPhoto[];
  gpxFile: TGpxFile | null;
  lastUpdateDate: string;
  detailsStatus: StatusEnum;
}

export type TGpxFile = {
  id: number;
  gpxUrl: string;
  gpxStatus: string;
  creationDate: string;
};
