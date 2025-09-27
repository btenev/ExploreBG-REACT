import { FaHandHoldingWater } from "react-icons/fa";

import { EditableFieldForm } from "@components/common";
import { useUpdateHikingTrailField } from "@hooks/dataHooks/trailHooks";
import { useWaterAvailabilityForm } from "@hooks/formHooks/trailHooks";
import { WaterAvailabilityEnum } from "@types";

interface Props {
  trailId: number;
  initialValue: WaterAvailabilityEnum;
  canEdit: boolean;
  formEnums: WaterAvailabilityEnum[];
  isLoadingEnums: boolean;
}

const TrailDetailsWaterAvailabilityField = ({
  trailId,
  initialValue,
  canEdit,
  formEnums,
  isLoadingEnums,
}: Props) => {
  const mutation = useUpdateHikingTrailField("waterAvailability", trailId);

  return (
    <EditableFieldForm
      label="Water sources"
      initialValue={{ waterAvailability: initialValue }}
      canEdit={canEdit}
      useFormHook={useWaterAvailabilityForm}
      mutation={mutation}
      helperMessage="Indicate if drinkable water is available along the trail"
      renderValue={(val, label) => (
        <p>
          <FaHandHoldingWater />
          &nbsp;&nbsp; {label}: &nbsp;{val.waterAvailability}
        </p>
      )}
      renderInput={(register, id) =>
        isLoadingEnums ? (
          <p>Loading water availability options...</p>
        ) : (
          <select id={id} {...register("waterAvailability")}>
            {formEnums.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        )
      }
    />
  );
};

export default TrailDetailsWaterAvailabilityField;
