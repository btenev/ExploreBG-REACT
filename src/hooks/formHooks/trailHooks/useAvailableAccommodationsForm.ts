import { z } from 'zod';

import useFormWithSchema from '../useFormWithSchema';
import { availableHutsRequestSchema } from '../../../schemas';

export const useAvailableAccommodationsForm = () => useFormWithSchema(availableHutsRequestSchema);

export type AvailableHutsDto = z.infer<typeof availableHutsRequestSchema>;
