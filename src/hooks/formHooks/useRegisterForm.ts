import useFormWithSchema from './useFormWithSchema';
import { registerSchema } from '../../schemas';

const useRegisterForm = () => useFormWithSchema(registerSchema);

export default useRegisterForm;
