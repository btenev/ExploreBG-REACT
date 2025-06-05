import { z } from 'zod';

import { roundToTwoDecimals } from '../utils/mixedUtils';

const placeRegex = /^[A-Za-z]+(\s?[A-Za-z]+)*$/;
const TEXT_PATTERN_GENERIC =
  'Your text can only contain English letters and spaces, but it must start with a letter.';

export const usernameMinLength = 3;
export const usernameMaxLength = 30;
export const passMinLength = 5;
export const passMaxLength = 24;
export const trailPlaceMinLength = 3;
export const trailPlaceMaxLength = 30;
export const trailInfoMaxLength = 3000;
export const commentMaxLength = 1000;

export const emailSchema = z
  .string()
  .nonempty('Please enter your email address.')
  .regex(/[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,4}/, 'The email format is incorrect.');

export const usernameSchema = z
  .string()
  .nonempty('Please enter your username.')
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

export const startPointSchema = z
  .string()
  .nonempty('Please enter the start point.')
  .regex(placeRegex, TEXT_PATTERN_GENERIC)
  .min(
    trailPlaceMinLength,
    `The start point must be at least ${trailPlaceMinLength} characters long.`
  )
  .max(
    trailPlaceMaxLength,
    `The start point can be a maximum of ${trailPlaceMaxLength} characters.`
  );

export const endPointSchema = z
  .string()
  .nonempty('Please enter the end point.')
  .regex(placeRegex, TEXT_PATTERN_GENERIC)
  .min(
    trailPlaceMinLength,
    `The end point must be at least ${trailPlaceMinLength} characters long.`
  )
  .max(trailPlaceMaxLength, `The end point can be a maximum of ${trailPlaceMaxLength} characters.`);

export const totalDistanceSchema = z
  .union([z.string(), z.literal('')])
  .refine((value) => value === '' || !isNaN(Number(value)), {
    message: 'Total distance must be a valid number or empty.',
  })
  .transform((value) => {
    if (value === '') return null;
    return roundToTwoDecimals(Number(value));
  })
  .refine((value) => value === null || value > 0, {
    message: 'Total distance must be greater than 0.',
  })
  .nullable();

export const elevationGainedSchema = z
  .union([z.string(), z.literal('')])
  .refine((value) => value === '' || !isNaN(Number(value)), {
    message: 'Elevation gained must be a valid number or empty.',
  })
  .transform((value) => {
    if (value === '') return null;
    return Math.floor(Number(value));
  })
  .refine((value) => value === null || value > 0, {
    message: 'Elevation gained must be a number greater than 0.',
  })
  .nullable();

export const nextToSchema = z
  .string()
  .nonempty('Please enter the town or city name near the trail.')
  .regex(placeRegex, TEXT_PATTERN_GENERIC)
  .min(
    trailPlaceMinLength,
    `The village/town/city name must be at least ${trailPlaceMinLength} characters long.`
  )
  .max(
    trailPlaceMaxLength,
    `The village/town/city name  can be a maximum of ${trailPlaceMaxLength} characters.`
  );

export const trailInfoSchema = z
  .string()
  .nonempty('Please provide a short description of the trail.')
  .regex(
    /^[a-zA-Z0-9\-.,\s\n()'`":;?!@]*$/,
    'Valid characters include uppercase and lowercase letters (A-Z, a-z), numbers (0-9), spaces, and the following symbols: ( ) : ; \' " ` ? ! - . , new line.'
  )
  .max(trailInfoMaxLength, `Trail info text must not exceed ${trailInfoMaxLength} characters.`);

export const messageSchema = z
  .string()
  .nonempty('Please enter a comment.')
  .max(commentMaxLength, `The comment must not exceed ${commentMaxLength} characters.`);
