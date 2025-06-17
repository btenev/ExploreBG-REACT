import { Dispatch } from 'react';

import { MdOutlineSend } from 'react-icons/md';
import { toast } from 'react-toastify';

import { useCreateComment } from '../../../hooks/dataHooks/useCreateComment';
import { CommentDataDto, useCommentForm } from '../../../hooks/formHooks/useCommentForm';
import { EntityType, IComment } from '../../../types';

interface Props {
  entityId: string;
  userId: number | null;
  handleNewComment: Dispatch<IComment>;
  entity: EntityType;
  disabled?: boolean;
}

const CommentsForm = ({ entityId, userId, handleNewComment, entity, disabled = false }: Props) => {
  const { register, handleSubmit, errors, setValue } = useCommentForm();
  const { mutate: createComment, isPending } = useCreateComment(handleNewComment);

  const onSubmit = (data: CommentDataDto) => {
    if (userId === null) {
      toast.warning('You must be logged in to add a comment.');
      return;
    }

    createComment({ entity, entityId: entityId, data });
    setValue('message', '');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="comments__add-comment-form">
      <input
        id="message"
        type="text"
        {...register('message')}
        disabled={disabled}
        placeholder="Add comment here..."
        aria-label="Add a comment"
      />

      <button type="submit" disabled={isPending || disabled} aria-label="Submit comment">
        <MdOutlineSend />
      </button>

      {errors.message && <div className="error-message">{errors.message.message}</div>}
    </form>
  );
};

export default CommentsForm;
