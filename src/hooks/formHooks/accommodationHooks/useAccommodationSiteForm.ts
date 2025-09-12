import z from "zod";

import { createAccommodationSchema } from "@schemas/accommodation";

import { useFormWithSchema } from "../base";

const accommodationSiteSchema = createAccommodationSchema.pick({
  site: true,
});

export const useAccommodationSiteForm = (
  defaultValues?: AccommodationSiteDto
) => useFormWithSchema(accommodationSiteSchema, defaultValues);

export type AccommodationSiteDto = z.infer<typeof accommodationSiteSchema>;
