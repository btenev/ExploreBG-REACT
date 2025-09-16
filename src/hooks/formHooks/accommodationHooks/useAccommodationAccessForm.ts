import { z } from "zod";

import { createAccommodationSchema } from "@schemas/accommodation";

import { useFormWithSchema } from "../base";

const accommodationAccessSchema = createAccommodationSchema.pick({
  access: true,
});

export const useAccommodationAccessForm = (
  defaultValues?: AccommodationAccessFormDto
) => useFormWithSchema(accommodationAccessSchema, defaultValues);

export type AccommodationAccessFormDto = z.infer<
  typeof accommodationAccessSchema
>;
