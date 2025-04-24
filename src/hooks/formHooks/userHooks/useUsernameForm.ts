import { z } from 'zod';

import useFormWithSchema from '../useFormWithSchema';
import { registerBaseSchema } from '../../../schemas';

const usernameSchema = registerBaseSchema.pick({ username: true });

export const useUsernameForm = () => useFormWithSchema(usernameSchema);

export type UsernameDto = z.infer<typeof usernameSchema>;
