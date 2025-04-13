import useFormWithSchema from './useFormWithSchema';
import { loginSchema } from '../../schemas';

const useLoginForm = () => useFormWithSchema(loginSchema);

export default useLoginForm;
