import { z } from "zod";

import { availableHutsRequestSchema } from "@schemas/trail";

import { useFormWithSchema } from "../base";

export const useAvailableAccommodationsForm = (
  defaultValues?: AvailableHutsDto
) => useFormWithSchema(availableHutsRequestSchema, defaultValues);

export type AvailableHutsDto = z.infer<typeof availableHutsRequestSchema>;
