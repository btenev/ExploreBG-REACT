import { DefaultValues } from "react-hook-form";
import { z } from "zod";

import { createHikeSchema } from "@schemas/hike";

import { useFormWithSchema } from "../base";

const hikeDateSchema = createHikeSchema.pick({ hikeDate: true });

export const useHikeDateForm = (defaultValues?: DefaultValues<HikeDateDto>) =>
  useFormWithSchema(hikeDateSchema, defaultValues);

export type HikeDateDto = z.infer<typeof hikeDateSchema>;
