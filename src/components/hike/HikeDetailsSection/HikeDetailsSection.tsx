import { EntityCreatedBy, FavoriteToggle } from "@components/common";
import { LastUpdatedProvider } from "@context/LastUpdate";
import { IHike } from "@types";

import { HikeDetailsEndPointField, HikeDetailsStartPointField } from "./fields";

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
      </section>
    </LastUpdatedProvider>
  );
};

export default HikeDetailsSection;
