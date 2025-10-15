import BaseCard from "@components/common/cards";
import { ITrailCard } from "@types";
import { getOwnershipFlags } from "@utils/ownershipUtils";

interface Props {
  card: ITrailCard;
  sessionUserId: number | null;
}

const TrailCard = ({ card, sessionUserId }: Props) => {
  const { canLike } = getOwnershipFlags(sessionUserId, card.createdById);
  return (
    <BaseCard
      id={card.id}
      name={card.trailName}
      imageUrl={card.imageUrl}
      likedByUser={card.likedByUser}
      entity="trail"
      canLike={canLike}
      linkTo={`/trails/${card.id}`}
      description={card.trailInfo}
    />
  );
};

export default TrailCard;
