import { z } from "zod";

import { registerBaseSchema } from "@schemas/user";

import { useFormWithSchema } from "../base";

const usernameSchema = registerBaseSchema.pick({ username: true });

export const useUsernameForm = (defaultValue?: UsernameDto) =>
  useFormWithSchema(usernameSchema, defaultValue);

export type UsernameDto = z.infer<typeof usernameSchema>;
