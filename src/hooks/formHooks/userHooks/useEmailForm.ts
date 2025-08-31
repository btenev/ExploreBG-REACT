import { z } from "zod";

import { registerBaseSchema } from "@schemas/user";

import { useFormWithSchema } from "../base";

const emailSchema = registerBaseSchema.pick({ email: true });

export const useEmailForm = () => useFormWithSchema(emailSchema);

export type EmailDto = z.infer<typeof emailSchema>;
