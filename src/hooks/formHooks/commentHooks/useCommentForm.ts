import { DefaultValues } from "react-hook-form";
import z from "zod";

import { commentSchema } from "@schemas/comment";

import { useFormWithSchema } from "../base";

export const useCommentForm = (defaultValues?: DefaultValues<CommentDataDto>) =>
  useFormWithSchema(commentSchema, defaultValues);

export type CommentDataDto = z.infer<typeof commentSchema>;
