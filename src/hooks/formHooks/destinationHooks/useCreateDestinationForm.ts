import { DefaultValues } from "react-hook-form";

import {
  createDestinationDto,
  createDestinationSchema,
} from "@schemas/destination";

import { useFormWithSchema } from "../base";

export const useCreateDestinationForm = (
  defaultValues?: DefaultValues<createDestinationDto>
) => useFormWithSchema(createDestinationSchema, defaultValues);
