import { z } from 'zod';

import { DifficultyLevelEnum, SeasonEnum, SuitableForEnum, WaterAvailabilityEnum } from '../types';

export const seasonVisitedSchema = z.nativeEnum(SeasonEnum);
export const waterAvailabilitySchema = z.nativeEnum(WaterAvailabilityEnum);
export const trailDifficultySchema = z.nativeEnum(DifficultyLevelEnum);
export const activity = z.nativeEnum(SuitableForEnum);

export const trailEnumsSchema = z.object({
  seasonVisited: z.array(seasonVisitedSchema),
  waterAvailability: z.array(waterAvailabilitySchema),
  trailDifficulty: z.array(trailDifficultySchema),
  activity: z.array(activity),
});
