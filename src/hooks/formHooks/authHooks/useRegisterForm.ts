import useFormWithSchema from '../useFormWithSchema';
import { registerSchema } from '../../../schemas';

export const useRegisterForm = () => useFormWithSchema(registerSchema);
