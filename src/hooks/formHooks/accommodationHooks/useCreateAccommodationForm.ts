import { DefaultValues } from "react-hook-form";

import {
  createAccommodationDto,
  createAccommodationSchema,
} from "@schemas/accommodation";

import { useFormWithSchema } from "../base";

export const useCreateAccommodationForm = (
  defaultValues?: DefaultValues<createAccommodationDto>
) => useFormWithSchema(createAccommodationSchema, defaultValues);
