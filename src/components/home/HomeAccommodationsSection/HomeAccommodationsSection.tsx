import { AccommodationCard } from "@components/accommodation";
import { IntersectionObserverComponent } from "@components/common";
import { useRandomAccommodations } from "@hooks/dataHooks/accommodationHooks";

interface Props {
  accommodationContent: {
    title: string;
    "backgr-img-info": string;
    "btn-view-all": string;
  };
  sessionUserId: number | null;
}

const HomeAccommodationsSection = ({
  accommodationContent,
  sessionUserId,
}: Props) => {
  /*TODO: fetch token from local storage if available*/
  const { data, isLoading, error } = useRandomAccommodations();

  if (isLoading) return <p>Loading...</p>;

  if (error) throw error;

  return (
    data && (
      <>
        <h2 className="home__section-title">{accommodationContent.title}</h2>

        <section
          className={"home__section-wrapper home__section-cards accommodations"}
        >
          <IntersectionObserverComponent />

          {data.map((accommodation) => (
            <article key={accommodation.id} className="card hidden">
              <AccommodationCard
                card={accommodation}
                sessionUserId={sessionUserId}
              />
            </article>
          ))}

          {/* <CPhotoInfo imgInfo={t('section-accommodations.backgr-img-info')} /> */}
        </section>

        {/* <aside className="home__section-links">
          <Link href={'/accommodations'} prefetch={false}>
            {t('section-accommodations.btn-view-all')}
          </Link>
        </aside> */}

        <section className="home__section-buffer"></section>
      </>
    )
  );
};

export default HomeAccommodationsSection;
