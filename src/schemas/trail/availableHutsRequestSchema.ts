import { z } from "zod";

export const availableHutsRequestSchema = z.object({
  items: z.array(z.object({ id: z.number(), accommodationName: z.string() })),
});
