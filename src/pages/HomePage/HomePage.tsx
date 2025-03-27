import './HomePage.scss';
import IntersectionObserverComponent from '../../components/IntersectionObserverComponent';
import { homeContent } from './home';
import { homeTopImages } from './home';
import useRandomDestinations from '../../hooks/useRandomDestionations';

const HomePage = () => {
  /*TODO: fetch token from local storage if available*/
  const { data, isLoading, error } = useRandomDestinations();

  if (isLoading) return <p>Loadding...</p>;

  if (error) {
    console.log(error);
  }

  if (data) {
    console.log(data);
  }

  return (
    <main className="home">
      <IntersectionObserverComponent />

      <section className="home__top">
        <h1>{homeContent.sectionTop.h1}</h1>
        <h2>{homeContent.sectionTop.h2}</h2>

        <figure className="home__top__images">
          {homeTopImages.map((img) => (
            <img
              key={img}
              src={img}
              width={300}
              height={300}
              loading="eager"
              alt="Explore BG home page image"
              title="Explore BG"
            />
          ))}
        </figure>

        <blockquote>
          <p>{homeContent.sectionTop.quote.text}</p>
          <span>- {homeContent.sectionTop.quote.author}</span>
        </blockquote>
      </section>

      <section className="home__section-wrapper">
        <h2 className="hidden">{homeContent['section-2'].title}</h2>
        <p className="hidden">{homeContent['section-2'].text}</p>
      </section>

      <section className="home__section-buffer"></section>
    </main>
  );
};

export default HomePage;
