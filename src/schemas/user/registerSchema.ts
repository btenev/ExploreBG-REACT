import { z } from "zod";

import { emailSchema, passwordSchema, usernameSchema } from "../common/fields";

export const registerBaseSchema = z.object({
  email: emailSchema,
  username: usernameSchema,
  password: passwordSchema,
  confirmPassword: z.string().nonempty("Please confirm your password."),
});

export const registerSchema = registerBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Your passwords do not match.",
    path: ["confirmPassword"],
  }
);

export type RegisterDto = z.infer<typeof registerSchema>;
