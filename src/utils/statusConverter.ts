import { ReviewStatusEnumSchema } from '../schemas';
import { ReviewStatusEnum } from '../types';
import { safeParseOrThrow } from './zodHelpers';

export const reviewStatusConverter = (entityStatus: unknown): ReviewStatusEnum => {
  return safeParseOrThrow(
    ReviewStatusEnumSchema,
    entityStatus,
    `Invalid entity status value: ${entityStatus}`
  );
};
