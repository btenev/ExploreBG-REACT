import useFormWithSchema from './useFormWithSchema';
import { registerSchema } from '../../schemas';

const useRegisterForm = () => {
  return useFormWithSchema(registerSchema);
};

export default useRegisterForm;
