import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { useToggleFavoriteStatus } from "@hooks/dataHooks/crossEntityHooks";
import { LikeableEntityType } from "@types";

import "./FavoriteToggle.scss";

interface Props {
  liked?: boolean;
  entityId: string;
  entity: LikeableEntityType;
}

const FavoriteToggle = ({ liked, entityId, entity }: Props) => {
  const [isLiked, setIsLiked] = useState<boolean>(liked ?? false);
  const { mutate: toggleStatus, isPending } =
    useToggleFavoriteStatus(setIsLiked);

  useEffect(() => {
    setIsLiked(liked ?? false);
  }, [liked]);

  const handleLikeClick = () => {
    if (isPending) return;

    toggleStatus({
      id: entityId,
      entity,
      data: { like: !isLiked },
    });
  };

  return (
    <span onClick={handleLikeClick} className="favorite-icon">
      {isLiked ? (
        <FaHeart
          className={isLiked ? "liked" : ""}
          title="Remove from favorite"
        />
      ) : (
        <FaRegHeart title="Add to favorite" />
      )}
    </span>
  );
};

export default FavoriteToggle;
