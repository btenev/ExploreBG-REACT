import useFormWithSchema from './useFormWithSchema';

import { userBirthdateSchema } from '../../schemas';

const useUserBirthdateForm = () => useFormWithSchema(userBirthdateSchema);

export default useUserBirthdateForm;
