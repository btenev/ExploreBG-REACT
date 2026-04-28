import { CatalogClient, CatalogPage } from "@components/common";
import { TrailCard } from "@components/trail";
import { useTrails } from "@hooks/dataHooks/trailHooks";
import { ITrailCard } from "@types";

const AllTrails = () => {
  return (
    <CatalogPage
      heading="Find exciting trails"
      renderContent={(userId) => (
        <CatalogClient
          alphabeticallySearchParam="startPoint"
          emptyMessage="No trails found."
          useFetcher={useTrails}
          renderCard={(card: ITrailCard) => (
            <TrailCard card={card} sessionUserId={userId} key={card.id} />
          )}
        />
      )}
    />
  );
};

export default AllTrails;
