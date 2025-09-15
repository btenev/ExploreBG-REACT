import z from "zod";

import { useFormWithSchema } from "@hooks/formHooks/base";
import { createAccommodationSchema } from "@schemas/accommodation";

const foodAvailableSchema = createAccommodationSchema.pick({
  availableFood: true,
});

export const useFoodAvailableForm = (defaultValues?: FoodAvailableFormDto) =>
  useFormWithSchema(foodAvailableSchema, defaultValues);

export type FoodAvailableFormDto = z.infer<typeof foodAvailableSchema>;
