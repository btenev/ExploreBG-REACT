import z from "zod";

import { AccessibilityEnum, AccommodationTypeEnum } from "@types";

export const accessSchema = z.nativeEnum(AccessibilityEnum);
export const typeSchema = z.nativeEnum(AccommodationTypeEnum);
