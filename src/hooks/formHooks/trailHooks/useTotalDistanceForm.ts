import { z } from "zod";

import { createTrailSchema } from "@schemas/trail";

import { useFormWithSchema } from "../base";

const totalDistanceSchema = createTrailSchema.pick({ totalDistance: true });

export const useTotalDistanceForm = (defaultValue?: TotalDistanceDto) =>
  useFormWithSchema(totalDistanceSchema, defaultValue);

export type TotalDistanceDto = z.infer<typeof totalDistanceSchema>;
