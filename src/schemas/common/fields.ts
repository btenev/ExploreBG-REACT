import { z } from "zod";

import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  TRAIL_PLACE_MIN_LENGTH,
  TRAIL_PLACE_MAX_LENGTH,
  TRAIL_INFO_MAX_LENGTH,
  COMMENT_MAX_LENGTH,
} from "@constants";
import { roundToTwoDecimals } from "@utils/mixedUtils";

const placeRegex = /^[A-Z][a-z]+(\s[A-Za-z]+)*$/;
const TEXT_PATTERN_GENERIC =
  "Your text can only contain English letters and spaces, but it must start with a capital letter.";

export const emailSchema = z
  .string()
  .nonempty("Please enter your email address.")
  .regex(
    /[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,4}/,
    "The email format is incorrect."
  );

export const usernameSchema = z
  .string()
  .nonempty("Please enter your username.")
  .regex(/^[A-Za-z]/, "Your username must start with an English letter.")
  .regex(
    /^[A-Za-z_\d]+$/,
    "Your username can only contain English letters, numbers, and underscores."
  )
  .min(
    USERNAME_MIN_LENGTH,
    `Your username must be at least ${USERNAME_MIN_LENGTH} characters long.`
  )
  .max(
    USERNAME_MAX_LENGTH,
    `Your username can be a maximum of ${USERNAME_MAX_LENGTH} characters.`
  );

export const passwordSchema = z
  .string()
  .nonempty("Please enter your password.")
  .regex(/[a-z]/, "Your password must contain at least one lowercase letter.")
  .regex(/[A-Z]/, "Your password must contain at least one uppercase letter.")
  .regex(/\d/, "Your password must contain at least one number.")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Your password must contain at least one special character."
  )
  .regex(/^\S*$/, "Your password cannot contain spaces.")
  .min(
    PASSWORD_MIN_LENGTH,
    `Your password must be at least ${PASSWORD_MIN_LENGTH} characters long.`
  )
  .max(
    PASSWORD_MAX_LENGTH,
    `Your password can be a maximum of ${PASSWORD_MAX_LENGTH} characters.`
  );

const createPlaceSchema = (fieldName: string) =>
  z
    .string()
    .nonempty(`Please enter the ${fieldName}.`)
    .regex(placeRegex, TEXT_PATTERN_GENERIC)
    .min(
      TRAIL_PLACE_MIN_LENGTH,
      `The ${fieldName} must be at least ${TRAIL_PLACE_MIN_LENGTH} characters long.`
    )
    .max(
      TRAIL_PLACE_MAX_LENGTH,
      `The ${fieldName} can be a maximum of ${TRAIL_PLACE_MAX_LENGTH} characters.`
    );

/*Trail*/
export const startPointSchema = createPlaceSchema("start point");
export const endPointSchema = createPlaceSchema("end point");
/*Accommodation*/

export const totalDistanceSchema = z
  .union([z.string(), z.number(), z.literal("")])
  .refine((value) => value === "" || !isNaN(Number(value)), {
    message: "Total distance must be a valid number or empty.",
  })
  .transform((value) => {
    if (value === "") return null;
    return roundToTwoDecimals(Number(value));
  })
  .refine((value) => value === null || value > 0, {
    message: "Total distance must be greater than 0.",
  })
  .nullable();

export const elevationGainedSchema = z
  .union([z.string(), z.number(), z.literal("")])
  .refine((value) => value === "" || !isNaN(Number(value)), {
    message: "Elevation gained must be a valid number or empty.",
  })
  .transform((value) => {
    if (value === "") return null;
    return Math.floor(Number(value));
  })
  .refine((value) => value === null || value > 0, {
    message: "Elevation gained must be a number greater than 0.",
  })
  .nullable();

export const nextToSchema = z
  .string()
  .nonempty("Please enter the town or city name near the trail.")
  .regex(placeRegex, TEXT_PATTERN_GENERIC)
  .min(
    TRAIL_PLACE_MIN_LENGTH,
    `The village/town/city name must be at least ${TRAIL_PLACE_MIN_LENGTH} characters long.`
  )
  .max(
    TRAIL_PLACE_MAX_LENGTH,
    `The village/town/city name  can be a maximum of ${TRAIL_INFO_MAX_LENGTH} characters.`
  );

export const trailInfoSchema = z
  .string()
  .nonempty("Please provide a short description of the trail.")
  .regex(
    /^[a-zA-Z0-9\-.,\s\n()'`":;?!@]*$/,
    "Valid characters include uppercase and lowercase letters (A-Z, a-z), numbers (0-9), spaces, and the following symbols: ( ) : ; ' \" ` ? ! - . , new line."
  )
  .max(
    TRAIL_INFO_MAX_LENGTH,
    `Trail info text must not exceed ${TRAIL_INFO_MAX_LENGTH} characters.`
  );

export const messageSchema = z
  .string()
  .nonempty("Please enter a comment.")
  .max(
    COMMENT_MAX_LENGTH,
    `The comment must not exceed ${COMMENT_MAX_LENGTH} characters.`
  );
