import { z } from "zod";

export const userBirthdateSchema = z.object({
  birthdate: z.preprocess(
    (val) => (val === "" ? null : val), // convert empty string to null
    z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Please enter the date in the format yyyy-MM-dd.",
      })
      .refine(isValidPastDate, {
        message: "Please enter a date in the past.",
      })
      .nullable()
  ),
});

export type UserBirthdateDto = z.infer<typeof userBirthdateSchema>;

// Utility to ensure the date string represents a past date
function isValidPastDate(value: string | null): boolean {
  if (!value) return true; // Allow null for optional field
  const date = new Date(value + "T00:00:00"); // ensure consistent day comparison
  const today = new Date();
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  return !isNaN(date.getTime()) && date < todayOnly;
}
