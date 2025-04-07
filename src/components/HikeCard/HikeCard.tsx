import defaultImg from '../../assets/images/hike-default.jpg';
import { IHikeCard } from '../../types';
import { formatDateToDDMMMYYYY } from '../../utils/dateUtils';

interface Props {
  card: IHikeCard;
}

const HikeCard = ({ card }: Props) => {
  const formattedHikeDate = formatDateToDDMMMYYYY(card.hikeDate);

  return (
    <>
      <figure>
        <img
          src={card.imageUrl || defaultImg}
          width={200}
          height={200}
          loading="lazy"
          alt="Hike image"
          title={card.hikeName}
        />
      </figure>

      <h4>{card.hikeName}</h4>
      <time dateTime={card.hikeDate}>{formattedHikeDate}</time>
      {card.hikeInfo && (
        <p>
          {card.hikeInfo.slice(0, 145)} {card.hikeInfo.length > 145 && '.....'}
        </p>
      )}
      {/* <Link
        href={{
          pathname: '/hikes/[hikeId]',
          params: { hikeId: card.id },
        }}
      >
        {t('card-btn')}
      </Link> */}
    </>
  );
};

export default HikeCard;
