import IntersectionObserverComponent from '../IntersectionObserverComponent';
import HikeCard from '../HikeCard';
import { useRandomHikes } from '../../hooks/useRandomHikes';

interface Props {
  hikeContent: {
    title: string;
    'btn-view-all': string;
    'btn-create': string;
  };
}

const HomeHikesSection = ({ hikeContent }: Props) => {
  const { data, isLoading, error } = useRandomHikes();

  if (isLoading) return <p>Loading...</p>;

  if (error) throw error;

  return (
    data && (
      <>
        <h2 className="home__section-title">{hikeContent.title}</h2>

        <section className={'home__section-wrapper home__section-cards hikes'}>
          <IntersectionObserverComponent />

          {data.map((hike) => (
            <article key={hike.id} className="card hidden">
              <HikeCard card={hike} />
            </article>
          ))}
        </section>

        {/* <aside className="home__section-links">
          <Link href={'/hikes'} prefetch={false}>
            {t('section-hikes.btn-view-all')}
          </Link> */}
        {/* <Link href={'/hikes/create'} prefetch={false}>
                {t('section-hikes.btn-create')}
        </Link> */}
        {/* </aside> */}

        <section className="home__section-buffer"></section>
      </>
    )
  );
};

export default HomeHikesSection;
