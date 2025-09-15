import z from "zod";

import {
  AccessibilityEnum,
  AccommodationTypeEnum,
  FoodAvailabilityEnum,
} from "@types";

export const accessSchema = z.nativeEnum(AccessibilityEnum);
export const typeSchema = z.nativeEnum(AccommodationTypeEnum);
export const availableFoodSchema = z.nativeEnum(FoodAvailabilityEnum);

export const accommodationEnumsSchema = z.object({
  access: z.array(accessSchema),
  type: z.array(typeSchema),
  availableFood: z.array(availableFoodSchema),
});
