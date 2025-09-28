import { z } from "zod";

import { createDestinationSchema } from "@schemas/destination";

import { useFormWithSchema } from "../base";

const destinationInfoSchema = createDestinationSchema.pick({
  destinationInfo: true,
});

export const useDestinationInfoForm = (defaultValues?: DestonationInfoDto) =>
  useFormWithSchema(destinationInfoSchema, defaultValues);

export type DestonationInfoDto = z.infer<typeof destinationInfoSchema>;
