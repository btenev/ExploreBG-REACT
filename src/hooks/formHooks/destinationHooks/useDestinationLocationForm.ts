import { z } from "zod";

import { createDestinationSchema } from "@schemas/destination";

import { useFormWithSchema } from "../base";

const destinationLocationSchema = createDestinationSchema.pick({
  latitude: true,
  longitude: true,
});

export const useDestinationLocationForm = (
  defaultValues?: DestinationLocationDto
) => useFormWithSchema(destinationLocationSchema, defaultValues);

export type DestinationLocationDto = z.infer<typeof destinationLocationSchema>;
