import { useState } from "react";

import {
  EntityDetailsNav,
  EntityDetailsWrapper,
  ImportantNotice,
} from "@components/common";
import DestinationDetailsSection from "@components/destination/DestinationDetailsSection";
import { useGetDestination } from "@hooks/dataHooks/destinationHooks";
// import { TPhoto } from "@types";

import "./DestinationDetails.scss";

const DestinationDetails = () => {
  const [photoCount, setPhotoCount] = useState(0);

  // const handlePhotosChange = useCallback((newPhotos: TPhoto[]) => {
  //   setPhotoCount(newPhotos.length);
  // }, []);
  return (
    <EntityDetailsWrapper
      entityType="destination"
      paramName="destinationId"
      fetchHook={useGetDestination}
    >
      {(destination, canEdit) => {
        if (photoCount === 0 && destination.images.length > 0) {
          setPhotoCount(destination.images.length);
        }

        return (
          <main className="destination-details">
            <h1>{`${destination.destinationName} - destination details`}</h1>

            {!canEdit && <ImportantNotice />}

            <EntityDetailsNav
              canEdit={canEdit}
              deletionObj="this accommodation"
              entity="accommodation"
              entityId={destination.id.toString()}
              imageAvailable={photoCount > 0}
              gpxFileAvailable={false}
            />

            <DestinationDetailsSection
              candEdit={canEdit}
              destination={destination}
            />
          </main>
        );
      }}
    </EntityDetailsWrapper>
  );
};

export default DestinationDetails;
