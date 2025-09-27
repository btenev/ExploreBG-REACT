import { z } from "zod";

import { createDestinationSchema } from "@schemas/destination";

import { useFormWithSchema } from "../base";

const useDestinationNextToSchema = createDestinationSchema.pick({
  nextTo: true,
});

export const useDestinationNextToForm = (
  defaultValues?: DestinationNextToDto
) => useFormWithSchema(useDestinationNextToSchema, defaultValues);

export type DestinationNextToDto = z.infer<typeof useDestinationNextToSchema>;
