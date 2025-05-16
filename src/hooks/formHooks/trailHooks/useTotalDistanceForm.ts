import { z } from 'zod';

import { createTrailSchema } from '../../../schemas';
import useFormWithSchema from '../useFormWithSchema';

const totalDistanceSchema = createTrailSchema.pick({ totalDistance: true });

export const useTotalDistanceForm = () => useFormWithSchema(totalDistanceSchema);

export type TotalDistanceDto = z.infer<typeof totalDistanceSchema>;
