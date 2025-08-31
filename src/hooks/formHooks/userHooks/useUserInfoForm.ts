import { userInfoSchema } from "@schemas/user";

import { useFormWithSchema } from "../base";

export const useUserInfoForm = () => useFormWithSchema(userInfoSchema);
