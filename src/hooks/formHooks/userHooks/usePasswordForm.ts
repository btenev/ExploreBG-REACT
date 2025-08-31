import { updatePasswordSchema } from "@schemas/user";

import { useFormWithSchema } from "../base";

export const usePasswordForm = () => {
  return useFormWithSchema(updatePasswordSchema);
};
