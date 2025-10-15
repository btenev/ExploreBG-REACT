import { IHut } from "../accommodation";
import { IDestination } from "../destination";
import {
  DifficultyLevelEnum,
  SeasonEnum,
  StatusEnum,
  SuitableForEnum,
  WaterAvailabilityEnum,
  IComment,
  IOwner,
  TPhoto,
} from "../shared";

export interface ITrailCard {
  id: number;
  trailName: string;
  trailInfo: string;
  imageUrl: string | null;
  likedByUser?: boolean;
  createdById?: number;
}

export interface ITrail extends ITrailCard {
  createdBy: IOwner;
  startPoint: string;
  endPoint: string;
  totalDistance: number | null;
  seasonVisited: SeasonEnum;
  waterAvailability: WaterAvailabilityEnum;
  availableHuts: IHut[];
  trailDifficulty: DifficultyLevelEnum;
  activity: SuitableForEnum[];
  comments: IComment[];
  elevationGained: number | null;
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
  gpxStatus: StatusEnum;
  creationDate: string;
};
