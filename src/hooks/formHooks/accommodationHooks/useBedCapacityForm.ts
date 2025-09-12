import z from "zod";

import { useFormWithSchema } from "@hooks/formHooks/base";
import { createAccommodationSchema } from "@schemas/accommodation";

const bedCapacitySchema = createAccommodationSchema.pick({ bedCapacity: true });

export const useBedCapacityForm = (defaultValues?: BedCapacityDto) =>
  useFormWithSchema(bedCapacitySchema, defaultValues);

export type BedCapacityDto = z.infer<typeof bedCapacitySchema>;
