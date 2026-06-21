import {
  EntityCreatedBy,
  EntityDetailsLastUpdateField,
  FavoriteToggle,
  FieldPair,
} from "@components/common";
import { LastUpdatedProvider } from "@context/LastUpdate";
import { useAvailableTrails } from "@hooks/dataHooks/trailHooks";
import { IHike } from "@types";

import {
  HikeDetailsEndPointField,
  HikeDetailsStartPointField,
  HikeDetailsDateField,
  HikeDetailsNextToField,
  HikeDetailsInfoField,
  HikeDetailsHikingTrailField,
} from "./fields";

import "./HikeDetailsSection.scss";

interface Props {
  hike: IHike;
  canEdit: boolean;
  canShowFavorite: boolean;
}

const HikeDetailsSection = ({ hike, canEdit, canShowFavorite }: Props) => {
  const { data: trails, isLoading: isLoadingTrails } =
    useAvailableTrails(canEdit);
  const { id } = hike;

  return (
    <LastUpdatedProvider>
      <section className="hike details-page-section">
        {canShowFavorite && (
          <FavoriteToggle
            liked={hike.likedByUser}
            entityId={id.toString()}
            entity="hike"
          />
        )}

        {hike.createdBy && <EntityCreatedBy createdBy={hike.createdBy} />}

        <HikeDetailsStartPointField
          hikeId={id}
          startPoint={hike.startPoint}
          canEdit={canEdit}
        />

        <HikeDetailsEndPointField
          hikeId={id}
          endPoint={hike.endPoint}
          canEdit={canEdit}
        />

        <FieldPair>
          <HikeDetailsDateField
            hikeId={id}
            hikeDate={hike.hikeDate}
            canEdit={canEdit}
          />

          <HikeDetailsNextToField
            hikeId={id}
            nextTo={hike.nextTo}
            canEdit={canEdit}
          />
        </FieldPair>

        <HikeDetailsHikingTrailField
          initialTrail={hike.trail}
          hikeId={id}
          canEdit={canEdit}
          availableTrails={trails || []}
          isLoadingTrails={isLoadingTrails}
        />

        <HikeDetailsInfoField
          hikeId={id}
          hikeInfo={hike.hikeInfo}
          canEdit={canEdit}
        />

        <EntityDetailsLastUpdateField lastUpdateDate={hike.lastUpdateDate} />
      </section>
    </LastUpdatedProvider>
  );
};

export default HikeDetailsSection;
