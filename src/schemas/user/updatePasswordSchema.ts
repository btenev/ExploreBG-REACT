import { z } from "zod";

import { passwordSchema } from "../common/fields";

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty("Please enter your current password."),
    newPassword: passwordSchema,
    confirmNewPassword: z
      .string()
      .nonempty("Please confirm your new password."),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match.",
    path: ["confirmNewPassword"],
  });

export type PasswordDto = z.infer<typeof updatePasswordSchema>;
