import { DefaultValues } from "react-hook-form";
import { z } from "zod";

import { createHikeSchema } from "@schemas/hike";

import { useFormWithSchema } from "../base";

const hikeNextToSchema = createHikeSchema.pick({
  nextTo: true,
});

export const useHikeNextToForm = (
  defaultValues?: DefaultValues<HikeNextToDto>
) => useFormWithSchema(hikeNextToSchema, defaultValues);

export type HikeNextToDto = z.infer<typeof hikeNextToSchema>;
