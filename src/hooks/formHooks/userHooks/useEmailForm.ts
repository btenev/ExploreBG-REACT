import { z } from 'zod';

import useFormWithSchema from '../useFormWithSchema';
import { registerBaseSchema } from '../../../schemas';

const emailSchema = registerBaseSchema.pick({ email: true });

export const useEmailForm = () => useFormWithSchema(emailSchema);

export type EmailDto = z.infer<typeof emailSchema>;
