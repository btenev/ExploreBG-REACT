import { z } from 'zod';
import {
  elevationGainedSchema,
  endPointSchema,
  nextToSchema,
  startPointSchema,
  totalDistanceSchema,
  trailInfoSchema,
} from './fields';
import {
  activitySchema,
  seasonVisitedSchema,
  trailDifficultySchema,
  waterAvailabilitySchema,
} from './trailEnumsSchema';

const availableHuts = z.object({
  id: z.number(),
});

const destinations = z.object({
  id: z.number(),
});

export const createTrailSchema = z.object({
  startPoint: startPointSchema,
  endPoint: endPointSchema,
  totalDistance: totalDistanceSchema,
  elevationGained: elevationGainedSchema,
  nextTo: nextToSchema,
  trailInfo: trailInfoSchema,

  seasonVisited: seasonVisitedSchema,
  waterAvailability: waterAvailabilitySchema,
  trailDifficulty: trailDifficultySchema,
  activity: z.array(activitySchema).min(1, 'Please select at least one activity'),

  availableHuts: z.array(availableHuts).optional(),
  destinations: z.array(destinations).optional(),
});

export type CreateTrailDto = z.infer<typeof createTrailSchema>;
