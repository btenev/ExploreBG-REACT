import { z } from 'zod';
import { emailSchema, passwordSchema, usernameSchema } from './fields';

export const registerSchema = z
  .object({
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema,
    confirmPassword: z.string({ required_error: 'Please confirm your password.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Your passwords do not match.',
    path: ['confirmPassword'],
  });

export type RegisterDto = z.infer<typeof registerSchema>;
