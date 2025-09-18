import AccommodationDetailsSection from "@components/accommodation/AccommodationDetailsSection";
import {
  EntityDetailsNav,
  EntityDetailsWrapper,
  ImportantNotice,
} from "@components/common";
import { useGetAccommodation } from "@hooks/dataHooks/accommodationHooks";

import "./AccommodationDetails.scss";

const AccommodationDetails = () => {
  return (
    <EntityDetailsWrapper
      entityType="accommodation"
      paramName="accommodationId"
      fetchHook={useGetAccommodation}
    >
      {(accommodation, canEdit) => (
        <main className="accommodation-details">
          <h1>{`${accommodation.accommodationName} - accommodation details`}</h1>

          {!canEdit && <ImportantNotice />}

          <EntityDetailsNav
            canEdit={canEdit}
            deletionObj="this trail"
            entity="trail"
            entityId={accommodation.id.toString()}
            imageAvailable={accommodation.images.length > 0}
            gpxFileAvailable={false}
          />

          <AccommodationDetailsSection
            candEdit={canEdit}
            accommodation={accommodation}
          />
        </main>
      )}
    </EntityDetailsWrapper>
  );
};

export default AccommodationDetails;
