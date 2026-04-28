import { CatalogPage, CatalogClient } from "@components/common";
import { HikeCard } from "@components/hike";
import { useHikes } from "@hooks/dataHooks/hikeHooks";
import { IHikeCard } from "@types";

const AllHikes = () => {
  return (
    <CatalogPage
      heading="Explore unforgettable hikes"
      renderContent={(userId) => (
        <CatalogClient
          alphabeticallySearchParam="startPoint"
          emptyMessage="No hikes found."
          dateSort={{
            sortBy: "hikeDate",
            newestLabel: "Most Recent",
            oldestLabel: "Oldest First",
          }}
          useFetcher={useHikes}
          renderCard={(card: IHikeCard) => (
            <HikeCard card={card} sessionUserId={userId} key={card.id} />
          )}
        />
      )}
    />
  );
};

export default AllHikes;
