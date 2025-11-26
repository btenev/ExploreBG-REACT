import { EntityCreatedBy, FavoriteToggle, FieldPair } from "@components/common";
import { LastUpdatedProvider } from "@context/LastUpdate";
import { IHike } from "@types";

import {
  HikeDetailsEndPointField,
  HikeDetailsStartPointField,
  HikeDetailsDateField,
  HikeDetailsNextToField,
  HikeDetailsInfoField,
} from "./fields";

import "./HikeDetailsSection.scss";

interface Props {
  hike: IHike;
  canEdit: boolean;
  canShowFavorite: boolean;
}

const HikeDetailsSection = ({ hike, canEdit, canShowFavorite }: Props) => {
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

        <HikeDetailsInfoField
          hikeId={id}
          hikeInfo={hike.hikeInfo}
          canEdit={canEdit}
        />
      </section>
    </LastUpdatedProvider>
  );
};

export default HikeDetailsSection;
