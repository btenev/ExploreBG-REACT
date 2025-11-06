import BaseCard from "@components/common/cards";
import { IDestinationCard } from "@types";
import { getOwnershipFlags } from "@utils/ownershipUtils";

interface Props {
  card: IDestinationCard;
  sessionUserId: number | null;
}

const DestinationCard = ({ card, sessionUserId }: Props) => {
  const { canLike } = getOwnershipFlags(sessionUserId, card.createdById);

  return (
    <BaseCard
      id={card.id}
      name={card.destinationName}
      imageUrl={card.imageUrl}
      likedByUser={card.likedByUser}
      entity="destination"
      canLike={canLike}
      linkTo={`/destinations/${card.id}`}
      subtitle={card.nextTo ? `close to: ${card.nextTo}` : undefined}
    />
  );
};

export default DestinationCard;
