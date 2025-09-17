import { EntityCreatedBy, FavoriteToggle, FieldPair } from "@components/common";
import { LastUpdatedProvider } from "@context/LastUpdate";
import { useAvailableAccommodations } from "@hooks/dataHooks/accommodationHooks";
import { useAvailableDestinations } from "@hooks/dataHooks/destinationHooks";
import { useTrailEnums } from "@hooks/dataHooks/utilityHooks";
import { ITrail, StatusEnum } from "@types";

import {
  TrailDetailsActivityField,
  TrailDetailsDifficultyField,
  TrailDetailsElevationField,
  TrailDetailsEndPointField,
  TrailDetailsInfoField,
  TrailDetailsSeasonVisited,
  TrailDetailsStartPointField,
  TrailDetailsTotalDistanceField,
  TrailDetailsWaterAvailabilityField,
  TrailDetailsAvailableHutsField,
  TrailDetailsDestinationsField,
} from "./fields";
import TrailDetailsLastUpdateField from "../../TrailDetailsLastUpdateField";

import "./TrailDetailsSection.scss";

interface Props {
  trail: ITrail;
  canEdit: boolean;
}

const TrailDetailsSection = ({ trail, canEdit }: Props) => {
  const { data: trailEnums, isLoading: isLoadingEnums } =
    useTrailEnums(canEdit);
  const { data: accommodations, isLoading: isLoadingAccommodations } =
    useAvailableAccommodations(canEdit);
  const { data: destinations, isLoading: isLoadingDestinations } =
    useAvailableDestinations(canEdit);

  return (
    <LastUpdatedProvider>
      <section className="trail details-page-section">
        {!canEdit && (
          <FavoriteToggle
            liked={trail.likedByUser}
            entityId={trail.id.toString()}
            entity="trail"
          />
        )}

        {trail.createdBy && <EntityCreatedBy createdBy={trail.createdBy} />}

        {trail.detailsStatus == StatusEnum.review && (
          <p>Trail details are currently in review!</p>
        )}

        {trail.detailsStatus != StatusEnum.review && (
          <>
            <TrailDetailsStartPointField
              trailId={trail.id}
              initialValue={trail.startPoint}
              canEdit={canEdit}
            />

            <TrailDetailsEndPointField
              trailId={trail.id}
              initialValue={trail.endPoint}
              canEdit={canEdit}
            />

            <FieldPair>
              <TrailDetailsTotalDistanceField
                trailId={trail.id}
                initialValue={trail.totalDistance}
                canEdit={canEdit}
              />

              <TrailDetailsElevationField
                trailId={trail.id}
                initialValue={trail.elevationGained}
                canEdit={canEdit}
              />
            </FieldPair>

            <FieldPair>
              <TrailDetailsSeasonVisited season={trail.seasonVisited} />

              <TrailDetailsActivityField
                trailId={trail.id}
                initialValue={trail.activity}
                canEdit={canEdit}
                formEnums={trailEnums?.activity ?? []}
                isLoadingEnums={isLoadingEnums}
              />
            </FieldPair>

            <FieldPair>
              <TrailDetailsWaterAvailabilityField
                trailId={trail.id}
                initialValue={trail.waterAvailability}
                canEdit={canEdit}
                formEnums={trailEnums?.waterAvailability ?? []}
                isLoadingEnums={isLoadingEnums}
              />

              <TrailDetailsDifficultyField
                trailId={trail.id}
                initialValue={trail.trailDifficulty}
                canEdit={canEdit}
                formEnums={trailEnums?.trailDifficulty ?? []}
                isLoadingEnums={isLoadingEnums}
              />
            </FieldPair>

            <TrailDetailsInfoField
              trailId={trail.id}
              initialValue={trail.trailInfo}
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
