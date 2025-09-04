// CommentItem.tsx
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { Link } from "react-router-dom";

import { PUBLIC_ROUTES } from "@constants";
import { useCommentForm } from "@hooks/formHooks/commentHooks";
import { IComment } from "@types";
import { formatEntityLastUpdate } from "@utils/dateUtils";

import { SubmitButton } from "../buttons";

interface CommentDataDto {
  message: string;
}

interface Props {
  comment: IComment;
  userId: number | null;

  isEditing: boolean;
  setEditingCommentId: Dispatch<SetStateAction<number | null>>;
  setCommentForDelete?: Dispatch<SetStateAction<number | null>>;
  onUpdateComment: (data: CommentDataDto, commentId: string) => void;
  isSubmitting?: boolean;
}

const CommentItem = ({
  comment,
  userId,
  isEditing,
  setEditingCommentId,
  setCommentForDelete,
  onUpdateComment,
  isSubmitting = false,
}: Props) => {
  const { register, handleSubmit, setValue, errors } = useCommentForm({
    message: comment.message,
  });

  const commentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isEditing) {
      setValue("message", comment.message);
      commentRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isEditing, comment.message, setValue]);

  const onSubmit = (data: CommentDataDto) => {
    if (data.message.trim() === comment.message.trim()) {
      setEditingCommentId(null);
      return;
    }

    onUpdateComment(data, comment.id.toString());
    setEditingCommentId(null);
  };

  return (
    <div className="comments__wrapper__comment" ref={commentRef}>
      <Link to={PUBLIC_ROUTES.user.getProfile.build(comment.owner.id)}>
        <span>
          <em>{comment.owner.username}</em>
        </span>
        <img
          src={comment.owner.imageUrl || "/images/user-profile-pic.png"}
          width={30}
          height={30}
          alt="User picture"
          loading="lazy"
          title={comment.owner.username}
        />
      </Link>

      <div className="comments__wrapper__comment__message">
        <p style={{ opacity: isEditing ? "0" : "1" }}>
          {comment.message}
          <time dateTime={comment.lastUpdateDate}>
            {comment.lastUpdateDate &&
              formatEntityLastUpdate(comment.lastUpdateDate)}
          </time>
        </p>

        {userId === comment.owner.id && !isEditing && (
          <FaEdit
            className="trail-edit-icon"
            onClick={() => setEditingCommentId(comment.id)}
          />
        )}

        {isEditing && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="comments__wrapper__comment__message__edit-form"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="text"
              {...register("message")}
              aria-label="Edit comment message"
            />

            <SubmitButton buttonName="Send" isSubmitting={isSubmitting} />
            <button type="button" onClick={() => setEditingCommentId(null)}>
              Cancel
            </button>
            {setCommentForDelete && (
              <ImBin onClick={() => setCommentForDelete(comment.id)} />
            )}

            {errors.message && (
              <div className="error-message">{errors.message.message}</div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
