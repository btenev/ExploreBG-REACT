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

import "./TrailDetails.scss";

const TrailDetails = () => {
  return (
    <EntityDetailsWrapper
      entityType="trail"
      paramName="trailId"
      fetchHook={useTrail}
    >
      {(trail, canEdit, userId) => (
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
              entityType="trail"
              folder="Trails"
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
      )}
    </EntityDetailsWrapper>
  );
};

export default TrailDetails;
