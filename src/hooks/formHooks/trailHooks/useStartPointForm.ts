import { z } from "zod";

import { createTrailSchema } from "@schemas/trail";

import { useFormWithSchema } from "../base";

const startPointSchema = createTrailSchema.pick({ startPoint: true });

export const useStartPointForm = (defaultValues?: StartPointDto) =>
  useFormWithSchema(startPointSchema, defaultValues);

export type StartPointDto = z.infer<typeof startPointSchema>;
