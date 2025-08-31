import { z } from 'zod';

export const availableHutsRequestSchema = z.object({
  availableHuts: z.array(z.object({ id: z.number() })),
});
