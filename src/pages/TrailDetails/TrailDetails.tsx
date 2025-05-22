import { Link, useParams } from 'react-router-dom';

import './TrailDetails.scss';

import {
  DeleteItem,
  LoadingScreenWrapper,
  NotFoundModal,
  PhotosSection,
} from '../../components/common';

import { useTrail } from '../../hooks/dataHooks/trailHooks';

import { isApiError } from '../../utils/errorHandlers';
import { isOwner } from '../../utils/mixedUtils';
import { getUserId } from '../../utils/sessionUtils';

import TrailDetailsSection from '../../components/TrailDetailsSection';

const TrailDetails = () => {
  const { trailId } = useParams<{ trailId: string }>();

  const numericId = Number(trailId);
  if (!trailId || isNaN(numericId))
    return (
      <NotFoundModal message="Oops! We couldn't find that trail. Please check the link and try again." />
    );

  const { data: trail, error, isLoading } = useTrail(trailId);

  if (isLoading) return <LoadingScreenWrapper />;

  if (error && isApiError(error) && error.status === 404) {
    return <NotFoundModal message="The hiking trail you're looking for was not found." />;
  }

  if (!trail) {
    return <NotFoundModal message="The hiking trail you're looking for was not found." />;
  }

  const userId = getUserId();

  const canEdit = userId !== null && isOwner(trail, userId);

  return (
    <main className="trail-details">
      <h1>{`${trail.startPoint} - ${trail.endPoint} - trail details`}</h1>

      {!canEdit && (
        <details open className="trail-details__warning">
          <summary>Important Notice:</summary>
          While ExploreBG moderates the data, its accuracy cannot always be guaranteed. ExploreBG is
          not responsible for any errors or inaccuracies. Please verify information through other
          reliable sources and exercise caution.
        </details>
      )}

      <nav className="trail-details__nav" aria-label="trail-details-page-navigation">
        {canEdit && <DeleteItem deletionObj="this trail" entity="trail" id={trail.id.toString()} />}

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
      {(trail.images.length > 0 || canEdit) && (
        <PhotosSection
          entityId={trail.id}
          photos={trail.images}
          canEdit={canEdit}
          folder="Trails"
        />
      )}
    </main>
  );
};

export default TrailDetails;
