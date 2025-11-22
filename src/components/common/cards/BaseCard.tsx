import { Link } from "react-router-dom";

import accommodationDefault from "@assets/images/accommodation-default.jpg";
import destinationDefault from "@assets/images/destination-default.jpg";
import hikeDefault from "@assets/images/hike-default.jpg";
import { FavoriteToggle } from "@components/common";
import { EntityType } from "@types";
import { formatFullDate, isValidIsoDate } from "@utils/dateUtils";

interface Props {
  id: number;
  name: string;
  imageUrl?: string | null;
  likedByUser?: boolean;
  entity: EntityType;
  canLike: boolean;
  linkTo: string;
  subtitle?: string;
  description?: string;
  date?: string;
}

const BaseCard = ({
  id,
  name,
  imageUrl,
  likedByUser,
  entity,
  canLike,
  linkTo,
  subtitle,
  description,
  date,
}: Props) => {
  const defaultImageMap: Record<EntityType, string> = {
    hike: hikeDefault,
    trail: hikeDefault,
    destination: destinationDefault,
    accommodation: accommodationDefault,
  };

  const isValid = !!date && isValidIsoDate(date);

  const defaultImage = defaultImageMap[entity];

  return (
    <>
      <figure>
        {canLike && (
          <FavoriteToggle
            liked={likedByUser}
            entityId={id.toString()}
            entity={entity}
          />
        )}
        <img
          src={imageUrl || defaultImage}
          width={200}
          height={200}
          loading="lazy"
          alt={`${entity} image - ${name}`}
          title={name}
        />
      </figure>

      <h4>{name}</h4>

      {date && (
        <time dateTime={isValid ? date : undefined}>
          {isValid ? formatFullDate(date) : "Date not set"}
        </time>
      )}
      {subtitle && <p>{subtitle}</p>}
      {description && (
        <p>
          {description.slice(0, 145)}
          {description.length > 145 && "....."}
        </p>
      )}

      <Link to={linkTo}>Learn more</Link>
    </>
  );
};

export default BaseCard;
