import { z } from "zod";

import { createTrailSchema } from "@schemas/trail";

import { useFormWithSchema } from "../base";

const activitySchema = createTrailSchema.pick({ activity: true });

export const useActivityForm = (defaultValue?: ActivityDto) =>
  useFormWithSchema(activitySchema, defaultValue);

export type ActivityDto = z.infer<typeof activitySchema>;
