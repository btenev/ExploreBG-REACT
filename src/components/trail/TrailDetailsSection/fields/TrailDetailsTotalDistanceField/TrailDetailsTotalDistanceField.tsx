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
  const mutation = useUpdateHikingTrailField("totalDistance", trailId);

  return (
    <EditableFieldForm
      label="Distance"
      initialValue={{ totalDistance: initialValue }}
      canEdit={canEdit}
      useFormHook={useTotalDistanceForm}
      mutation={mutation}
      helperMessage="Enter distance in kilometers. Use decimals for meters, e.g. 3.20 = 3 km 200 m."
      renderValue={(val, label) => (
        <p>
          <GiPathDistance />
          &nbsp; {label}: &nbsp;
          {val?.totalDistance !== null
            ? `${val.totalDistance} km`
            : "Not available"}
        </p>
      )}
      renderInput={(register, id) => (
        <input
          id={id}
          {...register("totalDistance")}
          placeholder="km"
          type="number"
          step="0.01"
        />
      )}
    />
  );
};

export default TrailDetailsTotalDistanceField;
