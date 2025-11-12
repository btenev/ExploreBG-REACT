import { DefaultValues } from "react-hook-form";

import { CreateHikeDto, createHikeSchema } from "@schemas/hike";

import { useFormWithSchema } from "../base";

export const useCreateHikeForm = (
  defaultValues?: DefaultValues<CreateHikeDto>
) => useFormWithSchema(createHikeSchema, defaultValues);
