import { DefaultValues } from "react-hook-form";
import { z } from "zod";

import { createHikeSchema } from "@schemas/hike";

import { useFormWithSchema } from "../base";

const endPointSchema = createHikeSchema.pick({ endPoint: true });

export const useEndPointForm = (defaultValues?: DefaultValues<EndPointDto>) =>
  useFormWithSchema(endPointSchema, defaultValues);

export type EndPointDto = z.infer<typeof endPointSchema>;
