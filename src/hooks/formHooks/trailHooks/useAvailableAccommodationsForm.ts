import { z } from "zod";

import { availableHutsRequestSchema } from "@schemas/trail";

import { useFormWithSchema } from "../base";

export const useAvailableAccommodationsForm = () =>
  useFormWithSchema(availableHutsRequestSchema);

export type AvailableHutsDto = z.infer<typeof availableHutsRequestSchema>;
