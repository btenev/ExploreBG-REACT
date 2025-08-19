import { Link } from 'react-router-dom';

import './TrailDetails.scss';

import {
  CommentsSection,
  DeleteItem,
  EntityDetailsWrapper,
  PhotosSection,
} from '../../components/common';

import { useTrail } from '../../hooks/dataHooks/trailHooks';

import TrailDetailsSection from '../../components/TrailDetailsSection';
import TrailMapSection from '../../components/TrailMapSection';

const TrailDetails = () => {
  return (
    <EntityDetailsWrapper entityType="trail" paramName="trailId" fetchHook={useTrail}>
      {(trail, canEdit, userId) => (
        <main className="trail-details">
          <h1>{`${trail.startPoint} - ${trail.endPoint} - trail details`}</h1>

          {!canEdit && (
            <details open className="trail-details__warning">
              <summary>Important Notice:</summary>
              While ExploreBG moderates the data, its accuracy cannot always be guaranteed.
              ExploreBG is not responsible for any errors or inaccuracies. Please verify information
              through other reliable sources and exercise caution.
            </details>
          )}

          <nav className="trail-details__nav" aria-label="trail-details-page-navigation">
            {canEdit && (
              <DeleteItem deletionObj="this trail" entity="trail" entityId={trail.id.toString()} />
            )}

            <ul>
              {trail.images.length > 0 && (
                <li>
                  <Link to="#photos">photos</Link>
                </li>
              )}
              {trail.gpxFile?.gpxUrl && (
                <li>
                  <Link to="#map">map</Link>
                </li>
              )}
              <li>
                <Link to="#comments">comments</Link>
              </li>
            </ul>
          </nav>

          <TrailDetailsSection trail={trail} canEdit={canEdit} />

          <span id="photos" />
          {(canEdit || trail.images.length > 0) && (
            <PhotosSection
              entityId={trail.id}
              photos={trail.images}
              canEdit={canEdit}
              folder="Trails"
            />
          )}

          <span id="map" />
          {(canEdit || trail.gpxFile) && (
            <TrailMapSection trailId={trail.id} gpxFile={trail.gpxFile} canEdit={canEdit} />
          )}

          <span id="comments" />
          <CommentsSection userId={userId} entity="trail" entityId={trail.id.toString()} />
        </main>
      )}
    </EntityDetailsWrapper>
  );
};

export default TrailDetails;
