import useFormWithScema from './useFormWithSchema';
import { updatePasswordSchema } from '../../schemas';

const usePasswordForm = () => {
  return useFormWithScema(updatePasswordSchema);
};

export default usePasswordForm;
