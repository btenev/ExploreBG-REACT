import { GiTrail } from "react-icons/gi";

import { EditFormInputSearch } from "@components/common";
import { useUpdateHikeField } from "@hooks/dataHooks/hikeHooks";
import { useAvailableTrailsForm } from "@hooks/formHooks/hikeHooks/useAvailableTrailsForm";
import { ITrailIdentifier } from "@types";

interface Props {
  initialTrail: ITrailIdentifier | null;
  hikeId: number;
  canEdit: boolean;
  availableTrails: ITrailIdentifier[];
  isLoadingTrails: boolean;
}

const HikeDetailsHikingTrailField = ({
  initialTrail,
  hikeId,
  canEdit,
  availableTrails,
  isLoadingTrails,
}: Props) => {
  const mutation = useUpdateHikeField("trail", hikeId);

  const initialItems = initialTrail ? [initialTrail] : [];

  return (
    <EditFormInputSearch<ITrailIdentifier>
      initialItems={initialItems}
      canEdit={canEdit}
      entityId={hikeId}
      availableItems={availableTrails}
      isLoadingItems={isLoadingTrails}
      useFormHook={useAvailableTrailsForm}
      mutation={mutation}
      placeholder="Search for a hiking trail..."
      title="Hiking trail"
      maxItems={1}
      icon={<GiTrail />}
      getName={(item) => item.trailName}
      linkPath={(item) => `/trails/${item.id}`}
    />
  );
};

export default HikeDetailsHikingTrailField;
