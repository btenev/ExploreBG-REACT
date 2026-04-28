import { AccommodationCard } from "@components/accommodation";
import { CatalogPage, CatalogClient } from "@components/common";
import { useAccommodations } from "@hooks/dataHooks/accommodationHooks";
import { IAccommodationCard } from "@types";

const AllAccommodations = () => {
  return (
    <CatalogPage
      heading="Explore unforgettable accommodations"
      renderContent={(userId) => (
        <CatalogClient
          alphabeticallySearchParam="accommodationName"
          emptyMessage="No accommodations found."
          useFetcher={useAccommodations}
          renderCard={(card: IAccommodationCard) => (
            <AccommodationCard
              card={card}
              sessionUserId={userId}
              key={card.id}
            />
          )}
        />
      )}
    />
  );
};

export default AllAccommodations;
