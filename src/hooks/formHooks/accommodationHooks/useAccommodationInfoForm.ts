import { z } from "zod";

import { createAccommodationSchema } from "@schemas/accommodation";

import { useFormWithSchema } from "../base";

const accommodationInfoSchema = createAccommodationSchema.pick({
  accommodationInfo: true,
});

export const useAccommodationInfoForm = (
  defaultValues?: AccommodationInfoDto
) => useFormWithSchema(accommodationInfoSchema, defaultValues);

export type AccommodationInfoDto = z.infer<typeof accommodationInfoSchema>;
