import { z } from "zod";

import { createDestinationSchema } from "@schemas/destination";

import { useFormWithSchema } from "../base";

const destinationTypeSchema = createDestinationSchema.pick({
  type: true,
});

export const useDestinationTypeForm = (defaultValues?: DestinationTypeDto) =>
  useFormWithSchema(destinationTypeSchema, defaultValues);

export type DestinationTypeDto = z.infer<typeof destinationTypeSchema>;
