import { z } from 'zod';
import { registerBaseSchema } from '../../schemas';
import useFormWithSchema from './useFormWithSchema';

const emailSchema = registerBaseSchema.pick({ email: true });

export const useEmailForm = () => useFormWithSchema(emailSchema);

export type EmailDto = z.infer<typeof emailSchema>;
