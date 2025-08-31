import { z } from 'zod';

export const destinationsRequestSchema = z.object({
  destinations: z.array(z.object({ id: z.number() })),
});
