import { EntityCreatedBy, FavoriteToggle, FieldPair } from "@components/common";
import { LastUpdatedProvider } from "@context/LastUpdate";
import { useAccommodationEnums } from "@hooks/dataHooks/utilityHooks";
import { IAccommodation, StatusEnum } from "@types";

import {
  AccommodationDetailsAccess,
  AccommodationDetailsBedCapacity,
  AccommodationDetailsFood,
  AccommodationDetailsInfo,
  AccommodationDetailsName,
  AccommodationDetailsNextTo,
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
            <FieldPair>
              <AccommodationDetailsName
                accommodationId={accommodation.id}
                initialValue={accommodation.accommodationName}
                canEdit={candEdit}
              />

              <AccommodationDetailsNextTo
                accommodationId={accommodation.id}
                initialValue={accommodation.nextTo}
                canEdit={candEdit}
              />
            </FieldPair>

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

              <AccommodationDetailsAccess
                accommodationId={accommodation.id}
                initialValue={accommodation.access}
                canEdit={candEdit}
                formEnums={accommodationEnums?.access ?? []}
                isLoadingEnums={isLoadingEnums}
              />
            </FieldPair>

            <AccommodationDetailsInfo
              accommodationId={accommodation.id}
              initialValue={accommodation.accommodationInfo}
              canEdit={candEdit}
            />
          </>
        )}
      </section>
    </LastUpdatedProvider>
  );
};

export default AccommodationDetailsSection;
