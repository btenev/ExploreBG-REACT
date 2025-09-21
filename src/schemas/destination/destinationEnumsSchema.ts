import { z } from "zod";

import { DestinationTypeEnum } from "@types";

export const destinationTypeSchema = z.nativeEnum(DestinationTypeEnum);

export const destinationEnumsSchema = z.object({
  type: z.array(destinationTypeSchema),
});

export type destinationEnumsDto = z.infer<typeof destinationEnumsSchema>;
