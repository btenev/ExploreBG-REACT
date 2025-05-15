import { z } from 'zod';

import { createTrailSchema } from '../../../schemas';
import useFormWithSchema from '../useFormWithSchema';

const waterAvailabilitySchema = createTrailSchema.pick({ waterAvailability: true });

export const useWaterAvailabilityForm = () => useFormWithSchema(waterAvailabilitySchema);

export type WaterAvailabilityDto = z.infer<typeof waterAvailabilitySchema>;
