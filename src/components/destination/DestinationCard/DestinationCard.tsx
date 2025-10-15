import BaseCard from "@components/common/cards";
import { IDestinationCard } from "@types";
import { getOwnershipFlags } from "@utils/ownershipUtils";

interface Props {
  card: IDestinationCard;
  sessionUserId: number | null;
}

const DestinationCard = ({ card, sessionUserId }: Props) => {
  console.log({
    sessionUserId,
    createdById: card.createdById,
    types: [typeof sessionUserId, typeof card.createdById],
    likedBuser: card.likedByUser,
  });
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
