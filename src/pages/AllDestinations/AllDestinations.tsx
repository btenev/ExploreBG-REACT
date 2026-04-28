import { CatalogPage, CatalogClient } from "@components/common";
import { DestinationCard } from "@components/destination";
import { useDestinations } from "@hooks/dataHooks/destinationHooks";
import { IDestinationCard } from "@types";

const AllDestinations = () => {
  return (
    <CatalogPage
      heading="Explore unforgettable destinations"
      renderContent={(userId) => (
        <CatalogClient
          alphabeticallySearchParam="destinationName"
          emptyMessage="No destinations found."
          useFetcher={useDestinations}
          renderCard={(card: IDestinationCard) => (
            <DestinationCard card={card} sessionUserId={userId} key={card.id} />
          )}
        />
      )}
    />
  );
};

export default AllDestinations;
