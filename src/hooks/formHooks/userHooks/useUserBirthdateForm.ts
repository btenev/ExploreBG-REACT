import { userBirthdateSchema, UserBirthdateDto } from "@schemas/user";

import { useFormWithSchema } from "../base";

export const useUserBirthdateForm = (defaultValue?: UserBirthdateDto) =>
  useFormWithSchema(userBirthdateSchema, defaultValue);
