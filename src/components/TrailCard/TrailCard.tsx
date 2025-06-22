import { Link } from 'react-router-dom';

import { ITrailCard } from '../../types';
import defaultImg from '../../assets/images/hike-default.jpg';

interface Props {
  card: ITrailCard;
}

const TrailCard = ({ card }: Props) => {
  return (
    <>
      <figure>
        {/* {token && (
            <CAddToOrRemoveFromFavorite
                liked={card.likedByUser}
                entityId={card.id}
                userToken={token}
            />
        )} */}

        <img
          src={card.imageUrl || defaultImg}
          width={200}
          height={200}
          loading="lazy"
          alt={`Trail image - ${card.trailName}`}
          title={card.trailName}
        />
      </figure>

      <h4>{card.trailName}</h4>
      <p>
        {card.trailInfo.slice(0, 145)} {card.trailInfo.length > 145 && '.....'}
      </p>
      <Link to={`/trails/${card.id}`}>Learn more</Link>
    </>
  );
};

export default TrailCard;
