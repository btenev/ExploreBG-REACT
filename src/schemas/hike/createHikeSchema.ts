import { z } from "zod";

import {
  endPointSchema,
  hikeDateSchema,
  hikeInfoSchema,
  nextToSchema,
  startPointSchema,
} from "../common/fields";

const availableTrail = z.object({
  id: z.number(),
});

export const createHikeSchema = z.object({
  startPoint: startPointSchema,
  endPoint: endPointSchema,
  hikeDate: hikeDateSchema,
  hikeInfo: hikeInfoSchema,
  nextTo: nextToSchema,
  trailId: availableTrail.optional(),
});

export type CreateHikeDto = z.infer<typeof createHikeSchema>;
