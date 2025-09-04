import { BackButton, SmallFooter, Logo } from "@components/common";

import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="container">
      <main className="not-found">
        <header>
          <Logo />
        </header>

        <section>
          <h1>Not Found</h1>
          <p>"Oops! The page you're looking for doesn't seem to exist."</p>

          <BackButton />
        </section>

        <SmallFooter />
      </main>
    </div>
  );
};

export default NotFound;
