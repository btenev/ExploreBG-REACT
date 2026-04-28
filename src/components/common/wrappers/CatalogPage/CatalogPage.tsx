import { ReactNode } from "react";

import { LoadingScreenWrapper } from "@components/common";
import { useSession } from "@hooks/sessionHooks";

interface Props {
  heading: string;
  renderContent: (userId: number | null) => ReactNode;
}

const CatalogPage = ({ heading, renderContent }: Props) => {
  const { hasHydrated, userId } = useSession();

  if (!hasHydrated) return <LoadingScreenWrapper />;

  return (
    <main className="catalog-wrapper">
      <h1>{heading}</h1>
      {renderContent(userId)}
    </main>
  );
};

export default CatalogPage;
