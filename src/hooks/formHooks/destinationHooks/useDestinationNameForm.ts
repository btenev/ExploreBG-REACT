import { z } from "zod";

import { createDestinationSchema } from "@schemas/destination";

import { useFormWithSchema } from "../base";

const destinationNameSchema = createDestinationSchema.pick({
  destinationName: true,
});

export const useDestinationNameForm = (defaultValues?: DestinationNameDto) =>
  useFormWithSchema(destinationNameSchema, defaultValues);

export type DestinationNameDto = z.infer<typeof destinationNameSchema>;
