import useFormWithSchema from './useFormWithSchema';
import { loginSchema } from '../../schemas';

const useLoginForm = () => {
  return useFormWithSchema(loginSchema);
};

export default useLoginForm;
