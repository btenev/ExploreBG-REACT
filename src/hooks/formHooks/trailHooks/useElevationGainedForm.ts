import { z } from 'zod';
import { createTrailSchema } from '../../../schemas';
import useFormWithSchema from '../useFormWithSchema';

const elevationGainedSchema = createTrailSchema.pick({ elevationGained: true });

export const useElevationGainedForm = () => useFormWithSchema(elevationGainedSchema);

export type ElevationGainedDto = z.infer<typeof elevationGainedSchema>;
