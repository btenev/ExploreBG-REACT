import { z } from "zod";

import { useFormWithSchema } from "@hooks/formHooks/base";
import { createAccommodationSchema } from "@schemas/accommodation";

const pricePerBedSchema = createAccommodationSchema.pick({ pricePerBed: true });

export const usePricePerBedForm = (defaultValues?: PricePerBedDto) =>
  useFormWithSchema(pricePerBedSchema, defaultValues);

export type PricePerBedDto = z.infer<typeof pricePerBedSchema>;
