import useFormWithSchema from '../useFormWithSchema';
import { userInfoSchema } from '../../../schemas';

export const useUserInfoForm = () => useFormWithSchema(userInfoSchema);
