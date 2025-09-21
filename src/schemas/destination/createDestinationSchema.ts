import { z } from "zod";

import { destinationTypeSchema } from "./destinationEnumsSchema";
import {
  destinationInfoSchema,
  destinationNameSchema,
  locationSchema,
  nextToSchema,
} from "../common/fields";

export const createDestinationSchema = z.object({
  destinationName: destinationNameSchema,
  nextTo: nextToSchema,
  location: locationSchema,
  destinationInfo: destinationInfoSchema,
  type: destinationTypeSchema,
});

export type createDestinationDto = z.infer<typeof createDestinationSchema>;
