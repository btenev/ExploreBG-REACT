import { GiMountainRoad } from "react-icons/gi";

import { EditableFieldForm } from "@components/common";
import { useUpdateHikingTrailField } from "@hooks/dataHooks/trailHooks";
import { useElevationGainedForm } from "@hooks/formHooks/trailHooks";

interface Props {
  trailId: number;
  initialValue: number | null;
  canEdit: boolean;
}

const TrailDetailsElevationField = ({
  trailId,
  initialValue,
  canEdit,
}: Props) => {
  const mutation = useUpdateHikingTrailField("elevationGained", trailId);

  return (
    <EditableFieldForm
      label="elevationGained"
      initialValue={{ elevationGained: initialValue }}
      canEdit={canEdit}
      useFormHook={useElevationGainedForm}
      mutation={mutation}
      inputType="number"
      renderValue={(val) => (
        <p>
          <GiMountainRoad />
          &nbsp; elevation: &nbsp;
          {val ? `${val} m` : "not available"}
        </p>
      )}
    />
  );
};

export default TrailDetailsElevationField;
