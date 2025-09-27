import { z } from "zod";

import { destinationTypeSchema } from "./destinationEnumsSchema";
import {
  destinationInfoSchema,
  destinationNameSchema,
  latitudeSchema,
  longitudeSchema,
  nextToSchema,
} from "../common/fields";

export const createDestinationSchema = z.object({
  destinationName: destinationNameSchema,
  nextTo: nextToSchema,
  latitude: latitudeSchema,
  longitude: longitudeSchema,
  destinationInfo: destinationInfoSchema,
  type: destinationTypeSchema,
});

export type createDestinationDto = z.infer<typeof createDestinationSchema>;
