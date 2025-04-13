import useFormWithSchema from './useFormWithSchema';
import { userInfoSchema } from '../../schemas';

const useUserInfoForm = () => useFormWithSchema(userInfoSchema);

export default useUserInfoForm;
