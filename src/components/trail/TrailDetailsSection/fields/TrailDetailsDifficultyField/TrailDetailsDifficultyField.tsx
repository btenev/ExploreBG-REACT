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
      label="Difficulty"
      initialValue={{ trailDifficulty: initialValue }}
      canEdit={canEdit}
      useFormHook={useTrailDifficultyForm}
      mutation={mutation}
      helperMessage="Select the difficulty level of the trail from easiest to hardest."
      renderValue={(val, label) => (
        <div className="editable-field__difficulty">
          <p>{label}</p>:&nbsp;&nbsp;
          <div>{repeatIcon(Number(val.trailDifficulty))}</div>
          <div className="editable-field__difficulty__empty">
            {repeatIcon(maxDifficultyLevel - Number(val.trailDifficulty))}
          </div>
        </div>
      )}
      renderInput={(register, id) =>
        isLoadingEnums ? (
          <p>Loading trail difficulty options...</p>
        ) : (
          <select
            id={id}
            {...register("trailDifficulty", { valueAsNumber: true })}
          >
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
