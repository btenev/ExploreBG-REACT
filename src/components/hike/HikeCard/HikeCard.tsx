import BaseCard from "@components/common/cards";
import { IHikeCard } from "@types";
import { formatDateToDDMMMYYYY } from "@utils/dateUtils";
import { getOwnershipFlags } from "@utils/ownershipUtils";

interface Props {
  card: IHikeCard;
  sessionUserId: number | null;
}

const HikeCard = ({ card, sessionUserId }: Props) => {
  const { canLike } = getOwnershipFlags(sessionUserId, card.createdById);
  const formattedHikeDate = formatDateToDDMMMYYYY(card.hikeDate);
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
      date={formattedHikeDate}
    />
  );
};

export default HikeCard;
