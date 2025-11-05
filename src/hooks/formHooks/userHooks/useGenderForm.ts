import { z } from "zod";

import { genderEnumSchema } from "@schemas/user";

import { useFormWithSchema } from "../base";

const genderEnumsSchemaObject = z.object({ gender: genderEnumSchema });

export const useGenderForm = (defaultValue?: GenderDto) =>
  useFormWithSchema(genderEnumsSchemaObject, defaultValue);

export type GenderDto = z.infer<typeof genderEnumsSchemaObject>;
