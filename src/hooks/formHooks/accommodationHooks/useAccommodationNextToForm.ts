import z from "zod";

import { useFormWithSchema } from "@hooks/formHooks/base";
import { createAccommodationSchema } from "@schemas/accommodation";

const accommodationNextToSchema = createAccommodationSchema.pick({
  nextTo: true,
});

export const useAccommodationNextToForm = (
  defaultValues?: AccommodationNextToFormDto
) => useFormWithSchema(accommodationNextToSchema, defaultValues);

export type AccommodationNextToFormDto = z.infer<
  typeof accommodationNextToSchema
>;
