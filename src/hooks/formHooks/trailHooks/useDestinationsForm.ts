import { z } from "zod";

import { destinationsRequestSchema } from "@schemas/trail";

import { useFormWithSchema } from "../base";

export const useDestinationsForm = (defaultValues?: DestinationsDto) =>
  useFormWithSchema(destinationsRequestSchema, defaultValues);

export type DestinationsDto = z.infer<typeof destinationsRequestSchema>;
