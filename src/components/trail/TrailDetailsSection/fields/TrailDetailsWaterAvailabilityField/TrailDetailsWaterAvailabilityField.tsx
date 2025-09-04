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
      label="waterAvailability"
      initialValue={{ waterAvailability: initialValue }}
      canEdit={canEdit}
      useFormHook={useWaterAvailabilityForm}
      mutation={mutation}
      renderValue={(val) => (
        <p>
          <FaHandHoldingWater />
          &nbsp;&nbsp; water sources: &nbsp;{val}
        </p>
      )}
      renderInput={(fieldKey, register) =>
        isLoadingEnums ? (
          <p>Loading water availability options...</p>
        ) : (
          <select {...register(fieldKey)}>
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
