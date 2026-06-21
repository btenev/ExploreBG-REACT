import { GiWoodCabin } from "react-icons/gi";

import { EditFormInputSearch } from "@components/common";
import { useUpdateHikingTrailField } from "@hooks/dataHooks/trailHooks";
import { useAvailableAccommodationsForm } from "@hooks/formHooks/trailHooks";
import { IHut } from "@types";

interface Props {
  initialAvailableHuts: IHut[];
  trailId: number;
  canEdit: boolean;
  availableAccommodations: IHut[];
  isLoadingAccommodations: boolean;
}

const TrailDetailsAvailableHutsField = ({
  initialAvailableHuts,
  trailId,
  canEdit,
  availableAccommodations,
  isLoadingAccommodations,
}: Props) => {
  const mutation = useUpdateHikingTrailField("availableHuts", trailId);

  return (
    <EditFormInputSearch<IHut>
      initialItems={initialAvailableHuts}
      canEdit={canEdit}
      entityId={trailId}
      availableItems={availableAccommodations}
      isLoadingItems={isLoadingAccommodations}
      useFormHook={useAvailableAccommodationsForm}
      mutation={mutation}
      placeholder="Search for huts..."
      title="Lodges in the area"
      icon={<GiWoodCabin />}
      getName={(item) => item.accommodationName}
      linkPath={(item) => `/accommodations/${item.id}`}
    />
  );
};

export default TrailDetailsAvailableHutsField;
