import { userInfoSchema, UserInfoDto } from "@schemas/user";

import { useFormWithSchema } from "../base";

export const useUserInfoForm = (defaultValue?: UserInfoDto) =>
  useFormWithSchema(userInfoSchema, defaultValue);
