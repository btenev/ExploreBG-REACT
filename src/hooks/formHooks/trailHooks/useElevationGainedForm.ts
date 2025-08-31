import { z } from "zod";

import { createTrailSchema } from "@schemas/trail";

import { useFormWithSchema } from "../base";

const elevationGainedSchema = createTrailSchema.pick({ elevationGained: true });

export const useElevationGainedForm = (defaultValue?: ElevationGainedDto) =>
  useFormWithSchema(elevationGainedSchema, defaultValue);

export type ElevationGainedDto = z.infer<typeof elevationGainedSchema>;
