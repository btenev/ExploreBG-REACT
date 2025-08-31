import { registerSchema } from "@schemas/user";

import { useFormWithSchema } from "../base";

export const useRegisterForm = () => useFormWithSchema(registerSchema);
