import { userBirthdateSchema } from "@schemas/user";

import { useFormWithSchema } from "../base";

export const useUserBirthdateForm = () =>
  useFormWithSchema(userBirthdateSchema);
