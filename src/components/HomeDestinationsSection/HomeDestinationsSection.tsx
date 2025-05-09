import DestinationCard from '../DestinationCard';
import IntersectionObserverComponent from '../IntersectionObserverComponent';
import { useRandomDestinations } from '../../hooks/dataHooks/destinationHooks';

interface Props {
  destinationContent: {
    title: string;
    'backgr-img-info': string;
    'btn-view-all': string;
  };
}

const HomeDestinationsSection = ({ destinationContent }: Props) => {
  /*TODO: fetch token from local storage if available*/
  const { data, isLoading, error } = useRandomDestinations();

  if (isLoading) return <p>Loading...</p>;

  if (error) throw error;

  return (
    data && (
      <>
        <h2 className="home__section-title">{destinationContent.title}</h2>

        <section className={`home__section-wrapper home__section-cards destinations`}>
          <IntersectionObserverComponent />

          {data.map((destination) => (
            <article key={destination.id} className="card hidden">
              <DestinationCard card={destination} />
            </article>
          ))}
        </section>

        <section className="home__section-buffer"></section>
      </>
    )
  );
};

export default HomeDestinationsSection;

// const HomeDestinationsSection: React.FC<HomeDestinationsSectionProps> = async () => {
//     const t = useTranslations('home');

//     const session = await getSession();
//     const token = session?.token;

//     const res = token
//         ? await agent.apiDestinations.get4RandomDestinations(token)
//         : await agent.apiDestinations.get4RandomDestinations();

//     return res.data && (
//         <>
//             <h2 className="home__section-title">{t('section-destinations.title')}</h2>

//             <section className={'home__section-wrapper home__section-cards destinations'}>
//                 <IntersectionObserverComponent />

//                 {res.data.map((destination: IDestinationCard) => (
//                     <article key={destination.id} className="card hidden">
//                         <DestinationCard card={destination} />
//                     </article>
//                 ))}

//                 <CPhotoInfo imgInfo={t('section-destinations.backgr-img-info')} />
//             </section>

//             <aside className="home__section-links">
//                 <Link href={'/destinations'} prefetch={false}>
//                     {t('section-destinations.btn-view-all')}
//                 </Link>
//             </aside>

//             <section className="home__section-buffer"></section>
//         </>
//     );
// };

// export default HomeDestinationsSection;
