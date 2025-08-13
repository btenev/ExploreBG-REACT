import { DefaultValues } from 'react-hook-form';
import { CreateTrailDto, createTrailSchema } from '../../../schemas';
import useFormWithSchema from '../useFormWithSchema';

export const useCreateTrailForm = (defaults?: DefaultValues<CreateTrailDto>) =>
  useFormWithSchema(createTrailSchema, defaults);
