import { z } from 'zod';

const userInfoMaxLength = 1500;

export const userInfoSchema = z.object({
  userInfo: z
    .string()
    .max(
      userInfoMaxLength,
      `Your user info can be a maximum of ${userInfoMaxLength} characters long.`
    )
    .optional(),
});

export type UserInfoDto = z.infer<typeof userInfoSchema>;
