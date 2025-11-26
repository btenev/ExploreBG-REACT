import { DefaultValues } from "react-hook-form";
import { z } from "zod";

import { createHikeSchema } from "@schemas/hike";

import { useFormWithSchema } from "../base";

const hikeInfoSchema = createHikeSchema.pick({
  hikeInfo: true,
});

export const useHikeInfoForm = (defaultValues?: DefaultValues<HikeInfoDto>) =>
  useFormWithSchema(hikeInfoSchema, defaultValues);

export type HikeInfoDto = z.infer<typeof hikeInfoSchema>;
