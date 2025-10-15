import { IntersectionObserverComponent } from "@components/common";
import {
  HomeTrailsSection,
  HomeAccommodationsSection,
  HomeDestinationsSection,
  HomeHikesSection,
} from "@components/home";
import { useSessionStore } from "@store/sessionStore";

import { homeContent, homeTopImages } from "./homeConetent";

import "./Home.scss";

const Home = () => {
  const { user, hasHydrated } = useSessionStore();

  if (!hasHydrated) return null;

  const userId = user?.userId ?? null;

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
        <h2 className="hidden">{homeContent["section-2"].title}</h2>
        <p className="hidden">{homeContent["section-2"].text}</p>
      </section>

      <section className="home__section-buffer"></section>

      <HomeDestinationsSection
        destinationContent={homeContent["section-destinations"]}
        sessionUserId={userId}
      />

      <HomeTrailsSection
        trailContent={homeContent["section-trails"]}
        sessionUserId={userId}
      />

      <HomeHikesSection
        hikeContent={homeContent["section-hikes"]}
        sessionUserId={userId}
      />

      <HomeAccommodationsSection
        accommodationContent={homeContent["section-accommodations"]}
        sessionUserId={userId}
      />
    </main>
  );
};

export default Home;
