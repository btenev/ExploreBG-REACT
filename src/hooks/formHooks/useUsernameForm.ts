import useFormWithSchema from './useFormWithSchema';
import { registerBaseSchema } from '../../schemas';

const usernameSchema = registerBaseSchema.pick({ username: true });

const useUsernameForm = () => {
  return useFormWithSchema(usernameSchema);
};

export default useUsernameForm;
