import { z } from "zod";

export const userBirthdateSchema = z.object({
  birthdate: z.preprocess(
    (val) => (val === "" ? null : val), // convert empty string to null
    z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Please enter the date in the format yyyy-MM-dd.",
      })
      .refine(isValidPastDate, { message: "Please enter a date in the past." })
      .nullable()
  ),
});

export type UserBithdateDto = z.infer<typeof userBirthdateSchema>;

// Utility to check if a string is a valid "yyyy-MM-dd" date and in the past
function isValidPastDate(value: string | null): boolean {
  if (!value) return true; // Allow null/undefined
  const date = new Date(value);
  const today = new Date();
  return !isNaN(date.getTime()) && date < today;
}
