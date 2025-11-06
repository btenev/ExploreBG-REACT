import { EntityCreatedBy, FavoriteToggle } from "@components/common";
import { IHike } from "@types";

import "./HikeDetailsSection.scss";

interface Props {
  hike: IHike;
  canEdit: boolean;
  canShowFavorite: boolean;
}

const HikeDetailsSection = ({ hike, canShowFavorite }: Props) => {
  return (
    <section className="hike details-page-section">
      {canShowFavorite && (
        <FavoriteToggle
          liked={hike.likedByUser}
          entityId={hike.id.toString()}
          entity="hike"
        />
      )}

      {hike.createdBy && <EntityCreatedBy createdBy={hike.createdBy} />}
    </section>
  );
};

export default HikeDetailsSection;
