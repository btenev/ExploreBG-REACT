import { z } from 'zod';

import useFormWithSchema from '../useFormWithSchema';
import { createTrailSchema } from '../../../schemas';

const endPointSchema = createTrailSchema.pick({ endPoint: true });

export const useEndPointForm = () => useFormWithSchema(endPointSchema);

export type EndPointDto = z.infer<typeof endPointSchema>;
