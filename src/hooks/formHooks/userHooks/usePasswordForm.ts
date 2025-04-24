import useFormWithScema from '../useFormWithSchema';
import { updatePasswordSchema } from '../../../schemas';

export const usePasswordForm = () => {
  return useFormWithScema(updatePasswordSchema);
};
