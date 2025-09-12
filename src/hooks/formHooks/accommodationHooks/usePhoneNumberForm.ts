import z from "zod";

import { useFormWithSchema } from "@hooks/formHooks/base";
import { createAccommodationSchema } from "@schemas/accommodation";

const phoneNumberSchema = createAccommodationSchema.pick({ phoneNumber: true });

export const usePhoneNumberForm = (defaultValues?: PhoneNumberDto) =>
  useFormWithSchema(phoneNumberSchema, defaultValues);

export type PhoneNumberDto = z.infer<typeof phoneNumberSchema>;
