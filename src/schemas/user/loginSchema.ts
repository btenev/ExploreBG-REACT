import { z } from "zod";

import { emailSchema, passwordSchema } from "../common/fields";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginDto = z.infer<typeof loginSchema>;
