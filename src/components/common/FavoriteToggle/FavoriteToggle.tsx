import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import './FavoriteToggle.scss';

import { EntityType } from '../../../hooks/dataHooks/useDeleteEntity';
import { useToggleFavoriteStatus } from '../../../hooks/dataHooks/useToggleFavoriteStatus';

interface Props {
  liked: boolean;
  entityId: string;
  entity: EntityType;
}

const FavoriteToggle = ({ liked, entityId, entity }: Props) => {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const { mutate: toggleStatus, isPending } = useToggleFavoriteStatus(setIsLiked);

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
        <FaHeart className={isLiked ? 'liked' : ''} title="Remove from favorite" />
      ) : (
        <FaRegHeart title="Add to favorite" />
      )}
    </span>
  );
};

export default FavoriteToggle;
