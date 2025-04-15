import { z } from 'zod';

import { GenderEnum } from '../types';

export const genderEnumSchema = z.nativeEnum(GenderEnum);

export const registerEnumsSchema = z.object({
  gender: z.array(genderEnumSchema),
});
