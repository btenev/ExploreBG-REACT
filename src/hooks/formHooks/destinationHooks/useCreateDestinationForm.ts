import { DefaultValues } from "react-hook-form";

import {
  CreateDestinationDto,
  createDestinationSchema,
} from "@schemas/destination";

import { useFormWithSchema } from "../base";

export const useCreateDestinationForm = (
  defaultValues?: DefaultValues<CreateDestinationDto>,
) => useFormWithSchema(createDestinationSchema, defaultValues);
