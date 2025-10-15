import { useCallback, useState } from "react";

import {
  CommentsSection,
  EntityDetailsNav,
  EntityDetailsWrapper,
  ImportantNotice,
  PhotosSection,
} from "@components/common";
import TrailDetailsSection from "@components/trail/TrailDetailsSection";
import TrailMapSection from "@components/trail/TrailMapSection";
import { useTrail } from "@hooks/dataHooks/trailHooks";
import { TPhoto } from "@types";

import "./TrailDetails.scss";

const TrailDetails = () => {
  const [photoCount, setPhotoCount] = useState(0);

  const handlePhotosChange = useCallback((newPhotos: TPhoto[]) => {
    setPhotoCount(newPhotos.length);
  }, []);

  return (
    <EntityDetailsWrapper
      entityType="trail"
      paramName="trailId"
      fetchHook={useTrail}
    >
      {(trail, canEdit, userId) => {
        if (photoCount === 0 && trail.images.length > 0) {
          setPhotoCount(trail.images.length);
        }

        return (
          <main className="trail-details">
            <h1>{`${trail.startPoint} - ${trail.endPoint} - trail details`}</h1>

            {!canEdit && <ImportantNotice />}

            <EntityDetailsNav
              canEdit={canEdit}
              deletionObj="this trail"
              entity="trail"
              entityId={trail.id.toString()}
              imageAvailable={trail.images.length > 0}
              gpxFileAvailable={!!trail.gpxFile}
            />

            <TrailDetailsSection trail={trail} canEdit={canEdit} />

            <span id="photos" />
            {(canEdit || trail.images.length > 0) && (
              <PhotosSection
                entityId={trail.id}
                photos={trail.images}
                canEdit={canEdit}
                photoEntityType="trail"
                folder="Trails"
                onPhotosChange={handlePhotosChange}
              />
            )}

            <span id="map" />
            {(canEdit || trail.gpxFile) && (
              <TrailMapSection
                trailId={trail.id}
                gpxFile={trail.gpxFile}
                canEdit={canEdit}
              />
            )}

            <span id="comments" />
            <CommentsSection
              userId={userId}
              entity="trail"
              entityId={trail.id.toString()}
            />
          </main>
        );
      }}
    </EntityDetailsWrapper>
  );
};

export default TrailDetails;
