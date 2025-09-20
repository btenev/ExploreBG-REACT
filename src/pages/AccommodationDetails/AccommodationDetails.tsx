import { useCallback, useState } from "react";

import AccommodationDetailsSection from "@components/accommodation/AccommodationDetailsSection";
import {
  CommentsSection,
  EntityDetailsNav,
  EntityDetailsWrapper,
  ImportantNotice,
  PhotosSection,
} from "@components/common";
import { useGetAccommodation } from "@hooks/dataHooks/accommodationHooks";
import { TPhoto } from "@types";

import "./AccommodationDetails.scss";

const AccommodationDetails = () => {
  const [photoCount, setPhotoCount] = useState(0);

  const handlePhotosChange = useCallback((newPhotos: TPhoto[]) => {
    setPhotoCount(newPhotos.length);
  }, []);

  return (
    <EntityDetailsWrapper
      entityType="accommodation"
      paramName="accommodationId"
      fetchHook={useGetAccommodation}
    >
      {(accommodation, canEdit, userId) => {
        // Update photoCount on first render if it’s 0
        if (photoCount === 0 && accommodation.images.length > 0) {
          setPhotoCount(accommodation.images.length);
        }

        return (
          <main className="accommodation-details">
            <h1>{`${accommodation.accommodationName} - accommodation details`}</h1>

            {!canEdit && <ImportantNotice />}

            <EntityDetailsNav
              canEdit={canEdit}
              deletionObj="this accommodation"
              entity="accommodation"
              entityId={accommodation.id.toString()}
              imageAvailable={photoCount > 0}
              gpxFileAvailable={false}
            />

            <AccommodationDetailsSection
              candEdit={canEdit}
              accommodation={accommodation}
            />

            <span id="photos" />
            {(canEdit || photoCount > 0) && (
              <PhotosSection
                entityId={accommodation.id}
                photos={accommodation.images}
                canEdit={canEdit}
                entityType="accommodation"
                folder="Accommodations"
                onPhotosChange={handlePhotosChange}
              />
            )}

            <span id="comments" />
            <CommentsSection
              userId={userId}
              entity="accommodation"
              entityId={accommodation.id.toString()}
            />
          </main>
        );
      }}
    </EntityDetailsWrapper>
  );
};

export default AccommodationDetails;
