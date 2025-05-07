import { z } from 'zod';

import useFormWithSchema from '../useFormWithSchema';
import { createTrailSchema } from '../../../schemas';

const startPointSchema = createTrailSchema.pick({ startPoint: true });

export const useStartPointForm = () => useFormWithSchema(startPointSchema);

export type StartPointDto = z.infer<typeof startPointSchema>;
