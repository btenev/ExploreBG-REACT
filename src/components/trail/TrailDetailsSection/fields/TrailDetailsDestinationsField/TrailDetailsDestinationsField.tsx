import { FcBinoculars } from "react-icons/fc";

import EditFormInputSearch from "@components/common/fields/EditFormInputSearch";
import { useUpdateHikingTrailField } from "@hooks/dataHooks/trailHooks";
import { useDestinationsForm } from "@hooks/formHooks/trailHooks";
import { IPlace } from "@types";

interface Props {
  initialDestinations: IPlace[];
  trailId: number;
  candEdit: boolean;
  availableDestinations: IPlace[];
  isLoadingDestinations: boolean;
}

const TrailDetailsDestinationsField = ({
  initialDestinations,
  trailId,
  candEdit,
  availableDestinations,
  isLoadingDestinations,
}: Props) => {
  const mutation = useUpdateHikingTrailField("destinations", trailId);

  return (
    <EditFormInputSearch<IPlace>
      initialItems={initialDestinations}
      canEdit={candEdit}
      entityId={trailId}
      availableItems={availableDestinations}
      isLoadingItems={isLoadingDestinations}
      useFormHook={useDestinationsForm}
      mutation={mutation}
      placeholder="Search destinations..."
      title="Curious places"
      icon={<FcBinoculars />}
      getName={(item) => item.destinationName}
      linkPath={(item) => `/destinations/${item.id}`}
    />
  );
};

export default TrailDetailsDestinationsField;
