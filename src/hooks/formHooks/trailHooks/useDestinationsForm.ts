import { z } from "zod";

import { destinationsRequestSchema } from "@schemas/trail";

import { useFormWithSchema } from "../base";

export const useDestinationsForm = () =>
  useFormWithSchema(destinationsRequestSchema);

export type DestinationsDto = z.infer<typeof destinationsRequestSchema>;
