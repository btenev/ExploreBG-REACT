import useFormWithSchema from '../useFormWithSchema';
import { userBirthdateSchema } from '../../../schemas';

export const useUserBirthdateForm = () => useFormWithSchema(userBirthdateSchema);
