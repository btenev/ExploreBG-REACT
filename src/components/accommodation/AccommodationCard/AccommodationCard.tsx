import BaseCard from "@components/common/cards";
import { IAccommodationCard } from "@types";
import { getOwnershipFlags } from "@utils/ownershipUtils";

interface Props {
  card: IAccommodationCard;
  sessionUserId: number | null;
}

const AccommodationCard = ({ card, sessionUserId }: Props) => {
  const { canLike } = getOwnershipFlags(sessionUserId, card.createdById);
  return (
    <BaseCard
      id={card.id}
      name={card.accommodationName}
      imageUrl={card.imageUrl}
      likedByUser={card.likedByUser}
      entity="accommodation"
      canLike={canLike}
      linkTo={`/accommodations/${card.id}`}
    />
  );
};

export default AccommodationCard;
