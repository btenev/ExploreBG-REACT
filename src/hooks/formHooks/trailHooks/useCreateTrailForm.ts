import { createTrailSchema } from '../../../schemas';
import useFormWithSchema from '../useFormWithSchema';

export const useCreateTrailForm = () => useFormWithSchema(createTrailSchema);
