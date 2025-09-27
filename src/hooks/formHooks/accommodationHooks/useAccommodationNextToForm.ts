import { z } from "zod";

import { createAccommodationSchema } from "@schemas/accommodation";

import { useFormWithSchema } from "../base";

const accommodationNextToSchema = createAccommodationSchema.pick({
  nextTo: true,
});

export const useAccommodationNextToForm = (
  defaultValues?: AccommodationNextToFormDto
) => useFormWithSchema(accommodationNextToSchema, defaultValues);

export type AccommodationNextToFormDto = z.infer<
  typeof accommodationNextToSchema
>;
