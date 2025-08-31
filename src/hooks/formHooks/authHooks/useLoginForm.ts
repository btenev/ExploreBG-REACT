import { loginSchema } from "@schemas/user";

import { useFormWithSchema } from "../base";

export const useLoginForm = () => useFormWithSchema(loginSchema);
