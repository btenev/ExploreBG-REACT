import { z } from "zod";

import { createHikeSchema } from "@schemas/hike";

import { useFormWithSchema } from "../base";

const startPointSchema = createHikeSchema.pick({ startPoint: true });

export const useStartPointForm = (defaultValues?: StartPointDto) =>
  useFormWithSchema(startPointSchema, defaultValues);

export type StartPointDto = z.infer<typeof startPointSchema>;
