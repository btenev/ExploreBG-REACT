import { z } from 'zod';

import { createTrailSchema } from '../../../schemas';
import useFormWithSchema from '../useFormWithSchema';

const trailDifficultySchema = createTrailSchema.pick({ trailDifficulty: true });

export const useTrailDifficultyForm = () => useFormWithSchema(trailDifficultySchema);

export type TrailDifficultyDto = z.infer<typeof trailDifficultySchema>;
