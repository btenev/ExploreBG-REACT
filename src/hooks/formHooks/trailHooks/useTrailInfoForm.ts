import { z } from 'zod';

import { createTrailSchema } from '../../../schemas';
import useFormWithSchema from '../useFormWithSchema';

const trailInfoSchema = createTrailSchema.pick({ trailInfo: true });

export const useTrailInfoForm = () => useFormWithSchema(trailInfoSchema);

export type TrailInfoDto = z.infer<typeof trailInfoSchema>;
