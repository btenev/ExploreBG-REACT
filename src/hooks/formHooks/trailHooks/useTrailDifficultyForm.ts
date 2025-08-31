import { z } from "zod";

import { createTrailSchema } from "@schemas/trail";

import { useFormWithSchema } from "../base";

const trailDifficultySchema = createTrailSchema.pick({ trailDifficulty: true });

export const useTrailDifficultyForm = (defaultValue?: TrailDifficultyDto) =>
  useFormWithSchema(trailDifficultySchema, defaultValue);

export type TrailDifficultyDto = z.infer<typeof trailDifficultySchema>;
