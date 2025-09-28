import {
  EntityCreatedBy,
  EntityDetailsLastUpdateField,
  FavoriteToggle,
  FieldPair,
} from "@components/common";
import { LastUpdatedProvider } from "@context/LastUpdate";
import { useDestinationEnums } from "@hooks/dataHooks/utilityHooks";
import { IDestination, StatusEnum } from "@types";

import {
  DestinationDetailsInfo,
  DestinationDetailsLocation,
  DestinationDetailsName,
  DestinationDetailsNextTo,
  DestinationDetailsType,
} from "./fields";

import "./DestinationDetailsSection.scss";

interface Props {
  destination: IDestination;
  candEdit: boolean;
}

const DestinationDetailsSection = ({ destination, candEdit }: Props) => {
  const { data: destinationEnums, isLoading: isLoadingEnums } =
    useDestinationEnums(candEdit);

  const { id, createdBy, detailsStatus } = destination;

  return (
    <LastUpdatedProvider>
      <section className="destination details-page-section">
        {!candEdit && (
          <FavoriteToggle
            liked={destination.likedByUser}
            entityId={id.toString()}
            entity="accommodation"
          />
        )}

        {createdBy && <EntityCreatedBy createdBy={createdBy} />}

        {detailsStatus === StatusEnum.review && (
          <p>Destination details are currently in review!</p>
        )}

        {detailsStatus !== StatusEnum.review && (
          <>
            <DestinationDetailsName
              destinationId={id}
              initialValue={destination.destinationName}
              canEdit={candEdit}
            />

            <DestinationDetailsNextTo
              destinationId={id}
              initialValue={destination.nextTo}
              canEdit={candEdit}
            />

            <FieldPair>
              <DestinationDetailsType
                destinationId={id}
                initialValue={destination.type}
                canEdit={candEdit}
                formEnums={destinationEnums?.type ?? []}
                isLoadingEnums={isLoadingEnums}
              />

              <DestinationDetailsLocation
                destinationId={id}
                initialValueLatitude={destination.latitude}
                initialValuelogitude={destination.longitude}
                canEdit={candEdit}
              />
            </FieldPair>

            <DestinationDetailsInfo
              destinationId={id}
              initialValue={destination.destinationInfo}
              canEdit={candEdit}
            />
          </>
        )}
        <EntityDetailsLastUpdateField
          lastUpdateDate={destination.lastUpdateDate}
        />
      </section>
    </LastUpdatedProvider>
  );
};

export default DestinationDetailsSection;
