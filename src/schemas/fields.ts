import { z } from 'zod';

export const passMinLength = 5;
export const passMaxLength = 24;

export const emailSchema = z
  .string()
  .nonempty('Please enter your email address.')
  .regex(/[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,4}/, 'The email format is incorrect.');

export const passwordSchema = z
  .string()
  .nonempty('Please enter your password.')
  .regex(/[a-z]/, 'Your password must contain at least one lowercase letter.')
  .regex(/[A-Z]/, 'Your password must contain at least one uppercase letter.')
  .regex(/\d/, 'Your password must contain at least one number.')
  .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Your password must contain at least one special character.')
  .regex(/^\S*$/, 'Your password cannot contain spaces.')
  .min(passMinLength, `Your password must be at least ${passMinLength} characters long.`)
  .max(passMaxLength, `Your password can be a maximum of ${passMaxLength} characters.`);
