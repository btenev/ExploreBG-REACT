import { z } from "zod";

import { availableTrailsRequestSchema } from "@schemas/hike";

import { useFormWithSchema } from "../base";

export const useAvailableTrailsForm = (defaultValues?: AvailableTrailsDto) =>
  useFormWithSchema(availableTrailsRequestSchema, defaultValues);

export type AvailableTrailsDto = z.infer<typeof availableTrailsRequestSchema>;
