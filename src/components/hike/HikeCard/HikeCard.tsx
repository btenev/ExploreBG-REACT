import BaseCard from "@components/common/cards";
import { IHikeCard } from "@types";
import { getOwnershipFlags } from "@utils/ownershipUtils";

interface Props {
  card: IHikeCard;
  sessionUserId: number | null;
}

const HikeCard = ({ card, sessionUserId }: Props) => {
  const { canLike } = getOwnershipFlags(sessionUserId, card.createdById);

  return (
    <BaseCard
      id={card.id}
      name={card.hikeName}
      imageUrl={card.imageUrl}
      likedByUser={card.likedByUser}
      entity="hike"
      canLike={canLike}
      linkTo={`/hikes/${card.id}`}
      description={card.hikeInfo}
      date={card.hikeDate}
    />
  );
};

export default HikeCard;
