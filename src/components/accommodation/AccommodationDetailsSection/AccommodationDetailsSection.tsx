import { EntityCreatedBy, FavoriteToggle, FieldPair } from "@components/common";
import { LastUpdatedProvider } from "@context/LastUpdate";
import { useAccommodationEnums } from "@hooks/dataHooks/utilityHooks";
import { IAccommodation, StatusEnum } from "@types";

import {
  AccommodationDetailsBedCapacity,
  AccommodationDetailsFood,
  AccommodationDetailsName,
  AccommodationDetailsPhoneNumber,
  AccommodationDetailsPricePerBed,
  AccommodationDetailsSite,
} from "./fields";

import "./AccommodationDetailsSection.scss";

interface Props {
  accommodation: IAccommodation;
  candEdit: boolean;
}

const AccommodationDetailsSection = ({ candEdit, accommodation }: Props) => {
  const { data: accommodationEnums, isLoading: isLoadingEnums } =
    useAccommodationEnums(candEdit);

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

            <FieldPair>
              <AccommodationDetailsSite
                accommodationId={accommodation.id}
                initialValue={accommodation.site}
                canEdit={candEdit}
              />

              <AccommodationDetailsPhoneNumber
                accommodationId={accommodation.id}
                initialValue={accommodation.phoneNumber}
                canEdit={candEdit}
              />
            </FieldPair>

            <FieldPair>
              <AccommodationDetailsBedCapacity
                accommodationId={accommodation.id}
                initialValue={accommodation.bedCapacity}
                canEdit={candEdit}
              />

              <AccommodationDetailsPricePerBed
                accommodationId={accommodation.id}
                initialValue={accommodation.pricePerBed}
                canEdit={candEdit}
              />
            </FieldPair>

            <FieldPair>
              <AccommodationDetailsFood
                accommodationId={accommodation.id}
                initialValue={accommodation.availableFood}
                canEdit={candEdit}
                formEnums={accommodationEnums?.availableFood ?? []}
                isLoadingEnums={isLoadingEnums}
              />
            </FieldPair>
          </>
        )}
      </section>
    </LastUpdatedProvider>
  );
};

export default AccommodationDetailsSection;
