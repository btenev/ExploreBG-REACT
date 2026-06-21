import { z } from "zod";

export const destinationsRequestSchema = z.object({
  items: z.array(z.object({ id: z.number(), destinationName: z.string() })),
});
