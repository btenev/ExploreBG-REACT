import { z } from "zod";

export const availableTrailsRequestSchema = z.object({
  items: z.array(z.object({ id: z.number(), trailName: z.string() })),
});
