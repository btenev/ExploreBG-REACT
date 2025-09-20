import { EntityCreatedBy, FavoriteToggle } from "@components/common";
import { LastUpdatedProvider } from "@context/LastUpdate";
import { IDestination, StatusEnum } from "@types";

import "./DestinationDetailsSection.scss";

interface Props {
  destination: IDestination;
  candEdit: boolean;
}

const DestinationDetailsSection = ({ destination, candEdit }: Props) => {
  const { id, createdBy, detailsStatus } = destination;

  return (
    <LastUpdatedProvider>
      <section className="destination details-page-section">
        {!candEdit && (
          <FavoriteToggle
            liked={destination.likedByUser}
            entityId={id.toString()}
            entity="accommodation"
          />
        )}

        {createdBy && <EntityCreatedBy createdBy={createdBy} />}

        {detailsStatus === StatusEnum.review && (
          <p>Destination details are currently in review!</p>
        )}
      </section>
    </LastUpdatedProvider>
  );
};

export default DestinationDetailsSection;
