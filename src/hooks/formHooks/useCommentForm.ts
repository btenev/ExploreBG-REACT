import { DefaultValues } from 'react-hook-form';

import z from 'zod';

import { messageSchema } from '../../schemas/fields';
import useFormWithSchema from './useFormWithSchema';

const commentSchema = z.object({
  message: messageSchema,
});

export const useCommentForm = (defaultValues?: DefaultValues<CommentDataDto>) =>
  useFormWithSchema(commentSchema, defaultValues);

export type CommentDataDto = z.infer<typeof commentSchema>;
