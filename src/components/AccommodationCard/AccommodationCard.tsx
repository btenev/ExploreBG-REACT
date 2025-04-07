import { IAccommodationCard } from '../../types';
import defaultImg from '../../assets/images/accommodation-default.jpg';

interface Props {
  card: IAccommodationCard;
}

const AccommodationCard = ({ card }: Props) => {
  return (
    <>
      <figure>
        <img
          src={card.imageUrl || defaultImg}
          width={200}
          height={200}
          loading="lazy"
          alt="Accommodation image"
          title={card.accommodationName}
        />
      </figure>

      <h4>{card.accommodationName}</h4>
      {/* <Link
        href={{
          pathname: '/accommodations/[accommodationId]',
          params: { accommodationId: card.id },
        }}
      >
        {t('card-btn')}
      </Link> */}
    </>
  );
};

export default AccommodationCard;
