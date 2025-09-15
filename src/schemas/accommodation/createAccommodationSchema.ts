import z from "zod";

import {
  accessSchema,
  availableFoodSchema,
  typeSchema,
} from "./accommodationEnumsSchema";
import {
  accommodationInfoSchema,
  accommodationNameSchema,
  bedCapacitySchema,
  nextToSchema,
  phoneNumberSchema,
  pricePerBedSchema,
  siteUrlSchema,
} from "../common/fields";

export const createAccommodationSchema = z.object({
  accommodationName: accommodationNameSchema,
  nextTo: nextToSchema,
  phoneNumber: phoneNumberSchema,
  site: siteUrlSchema,
  pricePerBed: pricePerBedSchema,
  bedCapacity: bedCapacitySchema,
  availableFood: availableFoodSchema,
  access: accessSchema,
  type: typeSchema,
  accommodationInfo: accommodationInfoSchema,
});

export type createAccommodationDto = z.infer<typeof createAccommodationSchema>;
