import { ComponentProps, ReactNode } from "react";
import { Link } from "react-router-dom";

import { LoadingScreenWrapper } from "@components/common";
import { useSession } from "@hooks/sessionHooks";

type LinkProps = ComponentProps<typeof Link>;

interface Props {
  heading: string;
  link: LinkProps;
  renderContent: (userId: number | null) => ReactNode;
}

const CatalogPage = ({ heading, link, renderContent }: Props) => {
  const { hasHydrated, userId } = useSession();

  if (!hasHydrated) return <LoadingScreenWrapper />;

  return (
    <main className="catalog-wrapper">
      <h1>{heading}</h1>
      <Link to={link.to} className="catalog-wrapper__create-btn">
        {link.children}
      </Link>
      {renderContent(userId)}
    </main>
  );
};

export default CatalogPage;
