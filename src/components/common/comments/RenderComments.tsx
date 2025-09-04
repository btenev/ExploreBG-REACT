import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { useUpdateComment } from "@hooks/dataHooks/commentHooks";
import { CommentDataDto } from "@hooks/formHooks/commentHooks";
import { IComment } from "@types";

import CommentItem from "./CommentItem";

interface Props {
  comments: IComment[];
  userId: number | null;
  handleNewComment: Dispatch<IComment>;
  setCommentForDelete?: Dispatch<SetStateAction<number | null>>;
  editingCommentId: number | null;
  setEditingCommentId: Dispatch<SetStateAction<number | null>>;
}

const RenderComments = ({
  comments,
  userId,
  handleNewComment,
  setCommentForDelete,
  editingCommentId,
  setEditingCommentId,
}: Props) => {
  const [prevCommentsCount, setPrevCommentsCount] = useState<number>(
    comments.length
  );
  const commentsEndRef = useRef<HTMLDivElement | null>(null);
  const { mutate: updateComment, isPending } =
    useUpdateComment(handleNewComment);

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (comments.length > prevCommentsCount) {
      scrollToBottom();
    }
    setPrevCommentsCount(comments.length);
  }, [comments, prevCommentsCount]);

  const onUpdateComment = (data: CommentDataDto, commentId: string) => {
    updateComment({ commentId, data });
  };

  return (
    <div className="comments__wrapper">
      {[...comments]
        .sort((a, b) => a.id - b.id)
        .map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            userId={userId}
            isEditing={editingCommentId === comment.id}
            setEditingCommentId={setEditingCommentId}
            onUpdateComment={onUpdateComment}
            setCommentForDelete={setCommentForDelete}
            isSubmitting={isPending}
          />
        ))}
      <div ref={commentsEndRef} />
    </div>
  );
};
export default RenderComments;
