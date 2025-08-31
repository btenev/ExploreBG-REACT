import { z } from "zod";

import { createTrailSchema } from "@schemas/trail";

import { useFormWithSchema } from "../base";

const endPointSchema = createTrailSchema.pick({ endPoint: true });

export const useEndPointForm = (defaultValues?: EndPointDto) =>
  useFormWithSchema(endPointSchema, defaultValues);

export type EndPointDto = z.infer<typeof endPointSchema>;
