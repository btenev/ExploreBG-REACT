import {
  EntityCreatedBy,
  EntityDetailsLastUpdateField,
  FavoriteToggle,
  FieldPair,
} from "@components/common";
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

  const { id, createdBy, detailsStatus } = accommodation;

  return (
    <LastUpdatedProvider>
      <section className="accommodation details-page-section">
        {!candEdit && (
          <FavoriteToggle
            liked={accommodation.likedByUser}
            entityId={id.toString()}
            entity="accommodation"
          />
        )}

        {createdBy && <EntityCreatedBy createdBy={createdBy} />}

        {detailsStatus === StatusEnum.review && (
          <p>Accommodation details are currently in review!</p>
        )}

        {detailsStatus !== StatusEnum.review && (
          <>
            <FieldPair>
              <AccommodationDetailsName
                accommodationId={id}
                initialValue={accommodation.accommodationName}
                canEdit={candEdit}
              />

              <AccommodationDetailsNextTo
                accommodationId={id}
                initialValue={accommodation.nextTo}
                canEdit={candEdit}
              />
            </FieldPair>

            <FieldPair>
              <AccommodationDetailsSite
                accommodationId={id}
                initialValue={accommodation.site}
                canEdit={candEdit}
              />

              <AccommodationDetailsPhoneNumber
                accommodationId={id}
                initialValue={accommodation.phoneNumber}
                canEdit={candEdit}
              />
            </FieldPair>

            <FieldPair>
              <AccommodationDetailsBedCapacity
                accommodationId={id}
                initialValue={accommodation.bedCapacity}
                canEdit={candEdit}
              />

              <AccommodationDetailsPricePerBed
                accommodationId={id}
                initialValue={accommodation.pricePerBed}
                canEdit={candEdit}
              />
            </FieldPair>

            <FieldPair>
              <AccommodationDetailsFood
                accommodationId={id}
                initialValue={accommodation.availableFood}
                canEdit={candEdit}
                formEnums={accommodationEnums?.availableFood ?? []}
                isLoadingEnums={isLoadingEnums}
              />

              <AccommodationDetailsAccess
                accommodationId={id}
                initialValue={accommodation.access}
                canEdit={candEdit}
                formEnums={accommodationEnums?.access ?? []}
                isLoadingEnums={isLoadingEnums}
              />
            </FieldPair>

            <AccommodationDetailsInfo
              accommodationId={id}
              initialValue={accommodation.accommodationInfo}
              canEdit={candEdit}
            />
          </>
        )}
        <EntityDetailsLastUpdateField
          lastUpdateDate={accommodation.lastUpdateDate}
        />
      </section>
    </LastUpdatedProvider>
  );
};

export default AccommodationDetailsSection;
