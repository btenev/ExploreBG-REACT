import useFormWithSchema from '../useFormWithSchema';
import { loginSchema } from '../../../schemas';

export const useLoginForm = () => useFormWithSchema(loginSchema);
