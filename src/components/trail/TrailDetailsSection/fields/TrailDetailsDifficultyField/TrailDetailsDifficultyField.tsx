import { GiHiking } from "react-icons/gi";

import { EditableFieldForm } from "@components/common";
import { useUpdateHikingTrailField } from "@hooks/dataHooks/trailHooks";
import { useTrailDifficultyForm } from "@hooks/formHooks/trailHooks";
import { DifficultyLevelEnum } from "@types";

interface Props {
  trailId: number;
  initialValue: DifficultyLevelEnum;
  canEdit: boolean;
  formEnums: DifficultyLevelEnum[];
  isLoadingEnums: boolean;
}

const TrailDetailsDifficultyField = ({
  trailId,
  initialValue,
  canEdit,
  formEnums,
  isLoadingEnums,
}: Props) => {
  const mutation = useUpdateHikingTrailField("trailDifficulty", trailId);

  const repeatIcon = (end: number) => {
    const icons = [];
    for (let i = 1; i <= end; i++) {
      icons.push(
        <span key={i}>
          <GiHiking />
        </span>
      );
    }

    return icons;
  };

  const maxDifficultyLevel = formEnums?.length;
  return (
    <EditableFieldForm
      label="difficulty"
      initialValue={{ trailDifficulty: initialValue }}
      canEdit={canEdit}
      useFormHook={useTrailDifficultyForm}
      mutation={mutation}
      renderValue={(val) => (
        <div className="editable-field__difficulty">
          <p>difficulty</p>:&nbsp;&nbsp;
          <div>{repeatIcon(Number(val))}</div>
          <div className="editable-field__difficulty__empty">
            {repeatIcon(maxDifficultyLevel - Number(val))}
          </div>
        </div>
      )}
      renderInput={(fieldKey, register) =>
        isLoadingEnums ? (
          <p>Loading trail difficulty options...</p>
        ) : (
          <select {...register(fieldKey, { valueAsNumber: true })}>
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

export default TrailDetailsDifficultyField;
