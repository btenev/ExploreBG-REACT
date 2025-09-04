import { GiPathDistance } from "react-icons/gi";

import { EditableFieldForm } from "@components/common";
import { useUpdateHikingTrailField } from "@hooks/dataHooks/trailHooks";
import { useTotalDistanceForm } from "@hooks/formHooks/trailHooks";

interface Props {
  trailId: number;
  initialValue: number | null;
  canEdit: boolean;
}

const TrailDetailsTotalDistanceField = ({
  trailId,
  initialValue,
  canEdit,
}: Props) => {
  // Mutation for updating the totalDistance field
  const mutation = useUpdateHikingTrailField("totalDistance", trailId);

  return (
    <EditableFieldForm
      label="distance"
      initialValue={{ totalDistance: initialValue }}
      canEdit={canEdit}
      useFormHook={useTotalDistanceForm}
      mutation={mutation}
      inputType="number"
      renderValue={(val) => (
        <p>
          <GiPathDistance />
          &nbsp; distance: &nbsp; {val ? `${val} km` : "Not available"}
        </p>
      )}
    />
  );
};

export default TrailDetailsTotalDistanceField;
