import { DefaultValues } from "react-hook-form";

import { CreateTrailDto, createTrailSchema } from "@schemas/trail";

import { useFormWithSchema } from "../base";

export const useCreateTrailForm = (defaults?: DefaultValues<CreateTrailDto>) =>
  useFormWithSchema(createTrailSchema, defaults);
