import { z } from 'zod';

import useFormWithSchema from '../useFormWithSchema';
import { destinationsRequestSchema } from '../../../schemas';

export const useDestinationsForm = () => useFormWithSchema(destinationsRequestSchema);

export type DestinationsDto = z.infer<typeof destinationsRequestSchema>;
