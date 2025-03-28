import IntersectionObserverComponent from '../IntersectionObserverComponent';
import { useRandomTrails } from '../../hooks/useRandomTrails';
import TrailCard from '../TrailCard';

interface Props {
  trailContent: {
    title: string;
    'btn-view-all': string;
    'btn-create': string;
  };
}

const HomeTrailsSection = ({ trailContent }: Props) => {
  /*TODO: fetch token from local storage if available*/
  const { data, isLoading, error } = useRandomTrails();

  if (isLoading) return <p>Loading...</p>;

  if (error) throw error;

  return (
    data && (
      <>
        <h2 className="home__section-title"> {trailContent.title}</h2>

        <section className={'home__section-wrapper home__section-cards trails'}>
          <IntersectionObserverComponent />

          {data.map((trail) => (
            <article key={trail.id} className="card hidden">
              <TrailCard card={trail} />
            </article>
          ))}
        </section>

        {/* <aside className="home__section-links">
          <Link href={'/trails'} prefetch={false}>
            {t('section-trails.btn-view-all')}
          </Link>
          <Link href={'/trails/create'} prefetch={false}>
            {t('section-trails.btn-create')}
          </Link>
        </aside> */}

        <section className="home__section-buffer"></section>
      </>
    )
  );
};

export default HomeTrailsSection;
