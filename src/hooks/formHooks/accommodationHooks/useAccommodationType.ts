import { z } from "zod";

import { useFormWithSchema } from "@hooks/formHooks/base";
import { createAccommodationSchema } from "@schemas/accommodation";

const accommodationTypeSchema = createAccommodationSchema.pick({
  type: true,
});

export const useAccommodationType = (
  defaultValues?: AccommodationTypeFormDto,
) => useFormWithSchema(accommodationTypeSchema, defaultValues);

export type AccommodationTypeFormDto = z.infer<typeof accommodationTypeSchema>;
