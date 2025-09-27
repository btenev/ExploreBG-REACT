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
      label="Elevation"
      initialValue={{ elevationGained: initialValue }}
      canEdit={canEdit}
      useFormHook={useElevationGainedForm}
      mutation={mutation}
      helperMessage="Enter the elevation gain of the trail in meters."
      renderValue={(val, label) => (
        <p>
          <GiMountainRoad />
          &nbsp; {label}: &nbsp;
          {val.elevationGained !== null
            ? `${val.elevationGained} m`
            : "Not available"}
        </p>
      )}
      renderInput={(register, id) => (
        <input
          id={id}
          {...register("elevationGained")}
          placeholder="meters"
          type="number"
          step="1"
        />
      )}
    />
  );
};

export default TrailDetailsElevationField;
