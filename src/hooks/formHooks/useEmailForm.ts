import { registerBaseSchema } from '../../schemas';
import useFormWithSchema from './useFormWithSchema';

const emailSchema = registerBaseSchema.pick({ email: true });

const useEmailForm = () => useFormWithSchema(emailSchema);

export default useEmailForm;
