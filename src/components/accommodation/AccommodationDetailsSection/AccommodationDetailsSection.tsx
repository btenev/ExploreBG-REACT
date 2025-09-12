import { EntityCreatedBy, FavoriteToggle } from "@components/common";
import { LastUpdatedProvider } from "@context/LastUpdate";
import { IAccommodation, StatusEnum } from "@types";

import { AccommodationDetailsName, AccommodationDetailsSite } from "./fields";

import "./AccommodationDetailsSection.scss";

interface Props {
  accommodation: IAccommodation;
  candEdit: boolean;
}

const AccommodationDetailsSection = ({ candEdit, accommodation }: Props) => {
  return (
    <LastUpdatedProvider>
      <section className="accommodation details-page-section">
        {!candEdit && (
          <FavoriteToggle
            liked={accommodation.likedByUser}
            entityId={accommodation.id.toString()}
            entity="accommodation"
          />
        )}

        {accommodation.createdBy && (
          <EntityCreatedBy createdBy={accommodation.createdBy} />
        )}

        {accommodation.detailsStatus === StatusEnum.review && (
          <p>Accommodation details are currently in review!</p>
        )}

        {accommodation.detailsStatus !== StatusEnum.review && (
          <>
            <AccommodationDetailsName
              accommodationId={accommodation.id}
              initialValue={accommodation.accommodationName}
              canEdit={candEdit}
            />

            <AccommodationDetailsSite
              accommodationId={accommodation.id}
              initialValue={accommodation.site}
              canEdit={candEdit}
            />
          </>
        )}
      </section>
    </LastUpdatedProvider>
  );
};

export default AccommodationDetailsSection;
