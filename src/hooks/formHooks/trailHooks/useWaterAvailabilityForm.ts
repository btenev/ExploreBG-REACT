import { z } from "zod";

import { createTrailSchema } from "@schemas/trail";

import { useFormWithSchema } from "../base";

const waterAvailabilitySchema = createTrailSchema.pick({
  waterAvailability: true,
});

export const useWaterAvailabilityForm = (defaultValue?: WaterAvailabilityDto) =>
  useFormWithSchema(waterAvailabilitySchema, defaultValue);

export type WaterAvailabilityDto = z.infer<typeof waterAvailabilitySchema>;
