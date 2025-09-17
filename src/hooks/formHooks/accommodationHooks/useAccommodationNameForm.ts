import { z } from "zod";

import { createAccommodationSchema } from "@schemas/accommodation";

import { useFormWithSchema } from "../base";

const accommodationNameSchema = createAccommodationSchema.pick({
  accommodationName: true,
});

export const useAccommodationNameForm = (
  defaultValues?: AccommodationNameDto
) => useFormWithSchema(accommodationNameSchema, defaultValues);

export type AccommodationNameDto = z.infer<typeof accommodationNameSchema>;
