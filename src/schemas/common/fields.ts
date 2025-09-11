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
  ACCOMMODATION_PLACE_MIN_LENGTH,
  ACCOMMODATION_PLACE_MAX_LENGTH,
  NEXT_TO_MIN_LENGTH,
  NEXT_TO_MAX_LENGTH,
  ACCOMMODATION_INFO_LENGTH,
} from "@constants";
import { roundToTwoDecimals } from "@utils/mixedUtils";

const placeRegex = /^[A-Z][a-z]+(\s[A-Za-z]+)*$/;
const TEXT_PATTERN_GENERIC =
  "Your text can only contain English letters and spaces, and it must start with a capital letter.";

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
    `Your password must be at most ${PASSWORD_MAX_LENGTH} characters long.`
  );

const createPlaceSchema = (
  fieldName: string,
  minLength: number,
  maxLength: number
) =>
  z
    .string()
    .nonempty(`Please enter your ${fieldName}.`)
    .regex(placeRegex, TEXT_PATTERN_GENERIC)
    .min(
      minLength,
      `Your ${fieldName} must be at least ${minLength} characters long.`
    )
    .max(
      maxLength,
      `Your ${fieldName} must be at most ${maxLength} characters long.`
    );

/*Trail*/
export const startPointSchema = createPlaceSchema(
  "start point",
  TRAIL_PLACE_MIN_LENGTH,
  TRAIL_PLACE_MAX_LENGTH
);
export const endPointSchema = createPlaceSchema(
  "end point",
  TRAIL_PLACE_MIN_LENGTH,
  TRAIL_PLACE_MAX_LENGTH
);
/*Accommodation*/
export const accommodationNameSchema = createPlaceSchema(
  "accommodation name",
  ACCOMMODATION_PLACE_MIN_LENGTH,
  ACCOMMODATION_PLACE_MAX_LENGTH
);
export const nextToSchema = createPlaceSchema(
  "nearby village, town, or city.",
  NEXT_TO_MIN_LENGTH,
  NEXT_TO_MAX_LENGTH
);

export const totalDistanceSchema = z
  .union([z.string(), z.number(), z.literal("")])
  .refine((value) => value === "" || !isNaN(Number(value)), {
    message: "Your total distance must be a valid number or left empty.",
  })
  .transform((value) => {
    if (value === "") return null;
    return roundToTwoDecimals(Number(value));
  })
  .refine((value) => value === null || value > 0, {
    message: "Your total distance must be greater than 0.",
  })
  .nullable();

export const elevationGainedSchema = z
  .union([z.string(), z.number(), z.literal("")])
  .refine((value) => value === "" || !isNaN(Number(value)), {
    message: "Your elevation gained must be a valid number or left empty.",
  })
  .transform((value) => {
    if (value === "") return null;
    return Math.floor(Number(value));
  })
  .refine((value) => value === null || value > 0, {
    message: "Your elevation gained must be greater than 0.",
  })
  .nullable();

const infoSchema = (maxLength: number) =>
  z
    .string()
    .trim()
    .nonempty("Please provide your description.")
    .regex(
      /^[a-zA-Z0-9\-.,\s\n()'`":;?!@]*$/,
      "Your description can only contain letters (A-Z, a-z), numbers (0-9), spaces, new lines, and these symbols: - . , ( ) ' ` \" : ; ? ! @"
    )
    .max(
      maxLength,
      `Your description must not exceed ${maxLength} characters.`
    );

export const trailInfoSchema = infoSchema(TRAIL_INFO_MAX_LENGTH);
export const accommodationInfoSchema = infoSchema(ACCOMMODATION_INFO_LENGTH);

export const messageSchema = z
  .string()
  .nonempty("Please enter your comment.")
  .max(
    COMMENT_MAX_LENGTH,
    `Your comment must not exceed ${COMMENT_MAX_LENGTH} characters.`
  );

/*Accommodation*/
export const phoneNumberSchema = z
  .string()
  .trim()
  .nullable()
  // Normalize first: remove spaces/dashes
  .transform((val) => (val ? val.replace(/[\s-]/g, "") : null))
  .superRefine((val, ctx) => {
    if (!val) return; // empty input is valid

    // 1. Prefix check
    if (!/^(?:\+359|0)/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Your phone number must start with +359 (international) or 0 (local). Example: +359871234567 or 0871234567.",
      });
      return;
    }

    // 2. Operator code check
    if (!/^(?:\+359|0)(87|88|89|98|99)/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Your phone number has an invalid operator code. Allowed codes are 87, 88, 89, 98, or 99. Example: 0871234567.",
      });
      return;
    }

    // 3. Length check
    if (val.length < 10 || val.length > 13) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Your phone number must be between 10 and 13 digits long. Example: +359871234567 or 0871234567.",
      });
      return;
    }

    // 4. Full format check
    if (!/^(?:\+359|0)(87|88|89|98|99)\d{7}$/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Your phone number contains invalid characters. Only digits, spaces, and dashes are allowed. Example: +359871234567 or 087 123 4567.",
      });
    }
  });

export const bedCapacitySchema = z.object({
  bedCapacity: z
    .string() // accept string input from form
    .transform((val) => (val === "" ? null : Number(val))) // convert empty string to null, others to number
    .refine((val) => val === null || (Number.isInteger(val) && val >= 0), {
      message: "Your bed capacity must be a non-negative integer.",
    })
    .nullable(),
});

export const pricePerBedSchema = z.object({
  pricePerBed: z
    .string() // input comes as string from form
    .trim()
    .transform((val) => (val === "" ? null : Number(val))) // empty -> null, otherwise convert to number
    .refine((val) => val === null || (typeof val === "number" && !isNaN(val)), {
      message: "Your price per bed must be a valid number.",
    })
    .refine((val) => val === null || val > 0.01, {
      message: "Your price per bed must be greater than 0.",
    })
    .nullable(),
});

export const siteUrlSchema = z
  .string()
  .trim()
  .nullable()
  .refine(
    (val) => {
      if (!val) return true; // empty is allowed
      try {
        new URL(val); // built-in URL parser
        return true;
      } catch {
        return false;
      }
    },
    {
      message: "Please provide a valid URL (e.g. https://example.com).",
    }
  );
