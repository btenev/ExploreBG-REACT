import { z } from 'zod';

const userInfoMaxLength = 1500;

export const userInfoSchema = z.object({
  userInfo: z
    .string()
    .nonempty('Please enter your user info.')
    .max(
      userInfoMaxLength,
      `Your user info can be a maximum of ${userInfoMaxLength} characters long.`
    ),
});
