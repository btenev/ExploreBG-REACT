import { z } from 'zod';

export const usernameMinLength = 3;
export const usernameMaxLength = 30;
export const passMinLength = 5;
export const passMaxLength = 24;

export const emailSchema = z
  .string()
  .nonempty('Please enter your email address.')
  .regex(/[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,4}/, 'The email format is incorrect.');

export const usernameSchema = z
  .string({ required_error: 'Please enter your username.' })
  .regex(/^[A-Za-z]/, 'Your username must start with an English letter.')
  .regex(
    /^[A-Za-z_\d]+$/,
    'Your username can only contain English letters, numbers, and underscores.'
  )
  .min(usernameMinLength, `Your username must be at least ${usernameMinLength} characters long.`)
  .max(usernameMaxLength, `Your username can be a maximum of ${usernameMaxLength} characters.`);

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
