import { z } from 'zod';

import { createTrailSchema } from '../../../schemas';
import useFormWithSchema from '../useFormWithSchema';

const activitySchema = createTrailSchema.pick({ activity: true });

export const useActivityForm = () => useFormWithSchema(activitySchema);
export type ActivityDto = z.infer<typeof activitySchema>;
