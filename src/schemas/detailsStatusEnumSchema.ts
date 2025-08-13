import { z } from 'zod';
import { StatusEnum } from '../types';

export const detailsStatusEnumSchema = z.nativeEnum(StatusEnum);
