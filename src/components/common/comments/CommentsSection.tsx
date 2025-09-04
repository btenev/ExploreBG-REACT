import { useEffect, useState } from "react";

import {
  useGetEntityComments,
  useDeleteComment,
} from "@hooks/dataHooks/crossEntityHooks";
import { EntityType, IComment } from "@types";

import CommentsForm from "./CommentsForm";
import RenderComments from "./RenderComments";
import ConfirmationModal from "../modals/ConfirmationModal";

interface Props {
  userId: number | null;
  entity: EntityType;
  entityId: string;
}

const CommentsSection = ({ userId, entity, entityId }: Props) => {
  const { data: serverComments = [] } = useGetEntityComments(entity, entityId);
  const [comments, setComments] = useState<IComment[]>([]);

  const [commentForDelete, setCommentForDelete] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const { mutate: deleteComment } = useDeleteComment(setComments);

  useEffect(() => {
    setComments(serverComments);
  }, [serverComments]);

  const handleNewComment = (newComment: IComment) => {
    setComments((prevComments) => {
      const index = prevComments.findIndex((c) => c.id === newComment.id);

      if (index !== -1) {
        // Replace existing comment
        return [
          ...prevComments.slice(0, index),
          newComment,
          ...prevComments.slice(index + 1),
        ];
      }

      // Add new comment
      return [...prevComments, newComment];
    });
  };

  const onConfirmClick = () => {
    deleteComment({ entity, entityId, secondaryId: String(commentForDelete!) });
    setCommentForDelete(null);
    setEditingCommentId(null);
  };

  return (
    <section className="comments details-page-section">
      <h3>comments:</h3>

      {comments.length > 0 && (
        <RenderComments
          comments={comments}
          userId={userId}
          handleNewComment={handleNewComment}
          setCommentForDelete={setCommentForDelete}
          editingCommentId={editingCommentId}
          setEditingCommentId={setEditingCommentId}
        />
      )}

      <CommentsForm
        entityId={entityId}
        userId={userId}
        handleNewComment={handleNewComment}
        entity={entity}
        disabled={editingCommentId !== null}
      />

      {commentForDelete && (
        <ConfirmationModal
          deletionObj="this message"
          confirm={onConfirmClick}
          cancel={() => setCommentForDelete(null)}
        />
      )}
    </section>
  );
};

export default CommentsSection;
