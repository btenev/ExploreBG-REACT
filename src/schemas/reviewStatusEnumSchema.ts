import z from 'zod';
import { ReviewStatusEnum } from '../types';

export const ReviewStatusEnumSchema = z.nativeEnum(ReviewStatusEnum);
