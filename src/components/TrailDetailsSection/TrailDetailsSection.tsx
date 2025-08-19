import { BsThermometerSun } from 'react-icons/bs';
import { FaSnowflake } from 'react-icons/fa6';
import { GiBeech, GiFallingLeaf } from 'react-icons/gi';

import './TrailDetailsSection.scss';

import { ITrail, StatusEnum } from '../../types';
import { FavoriteToggle, MemberImage } from '../common';

import { useAvailableAccommodations } from '../../hooks/dataHooks/accommodationHooks';
import { useAvailableDestinations } from '../../hooks/dataHooks/destinationHooks';
import { useTrailEnums } from '../../hooks/dataHooks/utilityHooks';

import TrailDetailsActivityField from '../TrailDetailsActivityField';
import TrailDetailsAvailableHutsField from '../TrailDetailsAvailableHutsField';
import TrailDetailsDestinationsField from '../TrailDetailsDestinationsField';
import TrailDetailsElevationField from '../TrailDetailsElevationField';
import TrailDetailsEndPointField from '../TrailDetailsEndPointField';
import TrailDetailsInfoField from '../TrailDetailsInfoField';
import TrailDetailsLastUpdateField from '../TrailDetailsLastUpdateField';
import TrailDetailsStartPointField from '../TrailDetailsStartPointField';
import TrailDetailsTotalDistanceField from '../TrailDetailsTotalDistanceField';
import TrailDetailsDifficultyField from '../TrailDetailsTrailDifficultyField';
import TrailDetailsWaterAvailabilityField from '../TrailDetailsWaterAvailabilityField';

import { LastUpdatedProvider } from '../../context/LastUpdateProvider';

const seasonIcons = {
  spring: <GiBeech className="spring" />,
  summer: <BsThermometerSun className="summer" />,
  autumn: <GiFallingLeaf className="autumn" />,
  winter: <FaSnowflake className="winter" />,
};

interface Props {
  trail: ITrail;
  canEdit: boolean;
}

const TrailDetailsSection = ({ trail, canEdit }: Props) => {
  const { data: trailEnums, isLoading: isLoadingEnums } = useTrailEnums(canEdit);
  const { data: accommodations, isLoading: isLoadingAccommodations } =
    useAvailableAccommodations(canEdit);
  const { data: destinations, isLoading: isLoadingDestinations } =
    useAvailableDestinations(canEdit);

  const season = trail.seasonVisited?.toLowerCase();
  return (
    <LastUpdatedProvider>
      <section className="trail details-page-section">
        {!canEdit && (
          <FavoriteToggle liked={trail.likedByUser} entityId={trail.id.toString()} entity="trail" />
        )}

        {trail.createdBy && (
          <div className="trail__created-by">
            <p>
              created by: &nbsp;<b>{trail.createdBy.username}</b>
            </p>
            <MemberImage
              ownerId={trail.createdBy.id}
              imageUrl={trail.createdBy.imageUrl}
              username={trail.createdBy.username}
            />
          </div>
        )}

        {trail.detailsStatus == StatusEnum.review && <p>Trail details are currently in review!</p>}

        {trail.detailsStatus != StatusEnum.review && (
          <>
            <TrailDetailsStartPointField
              initialStartPoint={trail.startPoint}
              trailId={trail.id}
              isTrailOwner={canEdit}
            />
            <TrailDetailsEndPointField
              initialEndPoint={trail.endPoint}
              trailId={trail.id}
              isTrailOwner={canEdit}
            />

            <div className="trail__pair">
              <TrailDetailsTotalDistanceField
                initialTotalDistance={trail.totalDistance}
                trailId={trail.id}
                canEdit={canEdit}
              />
              <TrailDetailsElevationField
                initialElevation={trail.elevationGained}
                trailId={trail.id}
                canEdit={canEdit}
              />
            </div>

            <div className="trail__pair">
              {trail.seasonVisited ? (
                <p className="trail__pair__season">
                  {seasonIcons[season as keyof typeof seasonIcons]}&nbsp; visited in:&nbsp;
                  {trail.seasonVisited}
                </p>
              ) : (
                <p>not-available</p>
              )}
              <TrailDetailsActivityField
                initialActivity={trail.activity}
                trailId={trail.id}
                canEdit={canEdit}
                formEnums={trailEnums?.activity ?? []}
                isLoadingEnums={isLoadingEnums}
              />
            </div>

            <div className="trail__pair">
              <TrailDetailsWaterAvailabilityField
                initialWaterAvailability={trail.waterAvailability}
                trailId={trail.id}
                canEdit={canEdit}
                formEnums={trailEnums?.waterAvailability ?? []}
                isLoadingEnums={isLoadingEnums}
              />
              <TrailDetailsDifficultyField
                initialTrailDifficulty={trail.trailDifficulty}
                trailId={trail.id}
                canEdit={canEdit}
                formEnums={trailEnums?.trailDifficulty ?? []}
                isLoadingEnums={isLoadingEnums}
              />
            </div>

            <TrailDetailsInfoField
              initialInfo={trail.trailInfo}
              trailId={trail.id}
              canEdit={canEdit}
            />

            <aside className="trail__links">
              <TrailDetailsAvailableHutsField
                initialAvailableHuts={trail.availableHuts}
                trailId={trail.id}
                canEdit={canEdit}
                availableAccommodations={accommodations ?? []}
                isLoadingAccommodations={isLoadingAccommodations}
              />
              <TrailDetailsDestinationsField
                initialDestinations={trail.destinations}
                trailId={trail.id}
                candEdit={canEdit}
                availableDestinations={destinations ?? []}
                isLoadingDestinations={isLoadingDestinations}
              />
            </aside>
          </>
        )}

        <TrailDetailsLastUpdateField lastUpdateDate={trail.lastUpdateDate} />
      </section>
    </LastUpdatedProvider>
  );
};

export default TrailDetailsSection;
