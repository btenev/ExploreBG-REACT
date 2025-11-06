import { useCallback, useState } from "react";

import {
  CommentsSection,
  EntityDetailsNav,
  EntityDetailsWrapper,
  ImportantNotice,
  PhotosSection,
} from "@components/common";
import DestinationDetailsSection from "@components/destination/DestinationDetailsSection";
import { useGetDestination } from "@hooks/dataHooks/destinationHooks";
import { TPhoto } from "@types";

import "./DestinationDetails.scss";

const DestinationDetails = () => {
  const [photoCount, setPhotoCount] = useState(0);

  const handlePhotosChange = useCallback((newPhotos: TPhoto[]) => {
    setPhotoCount(newPhotos.length);
  }, []);
  return (
    <EntityDetailsWrapper
      entityType="destination"
      paramName="destinationId"
      fetchHook={useGetDestination}
    >
      {(destination, canEdit, userId, canShowFavorite) => {
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
              canShowFavorite={canShowFavorite}
            />

            <span id="photos" />
            {(canEdit || photoCount > 0) && (
              <PhotosSection
                entityId={destination.id}
                photos={destination.images}
                canEdit={canEdit}
                photoEntityType="destination"
                folder="Destinations"
                onPhotosChange={handlePhotosChange}
              />
            )}

            <span id="comments" />
            <CommentsSection
              userId={userId}
              entity="destination"
              entityId={destination.id.toString()}
            />
          </main>
        );
      }}
    </EntityDetailsWrapper>
  );
};

export default DestinationDetails;
