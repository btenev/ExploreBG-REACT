import { z } from "zod";

import { createTrailSchema } from "@schemas/trail";

import { useFormWithSchema } from "../base";

const trailInfoSchema = createTrailSchema.pick({ trailInfo: true });

export const useTrailInfoForm = (defaultValue?: TrailInfoDto) =>
  useFormWithSchema(trailInfoSchema, defaultValue);

export type TrailInfoDto = z.infer<typeof trailInfoSchema>;
