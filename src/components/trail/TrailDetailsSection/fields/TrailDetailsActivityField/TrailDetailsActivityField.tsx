import { FaBiking } from "react-icons/fa";
import { GiHiking } from "react-icons/gi";
import { TbRun } from "react-icons/tb";

import { EditableFieldForm } from "@components/common";
import { useUpdateHikingTrailField } from "@hooks/dataHooks/trailHooks";
import { useActivityForm } from "@hooks/formHooks/trailHooks";
import { SuitableForEnum } from "@types";

const ACTIVITY_ICONS = {
  hiking: <GiHiking />,
  "trail-running": <TbRun />,
  "mountain-biking": <FaBiking />,
};

const getActivityIcon = (activity: string) =>
  ACTIVITY_ICONS[activity.toLowerCase() as keyof typeof ACTIVITY_ICONS];

interface Props {
  trailId: number;
  initialValue: SuitableForEnum[];
  canEdit: boolean;
  formEnums: SuitableForEnum[];
  isLoadingEnums: boolean;
}

const TrailDetailsActivityField = ({
  trailId,
  initialValue,
  canEdit,
  formEnums,
  isLoadingEnums,
}: Props) => {
  const mutation = useUpdateHikingTrailField("activity", trailId);

  return (
    <EditableFieldForm
      label="Suitable for"
      initialValue={{ activity: initialValue }}
      canEdit={canEdit}
      formClassName="editable-field__form__checkbox"
      useFormHook={useActivityForm}
      mutation={mutation}
      helperMessage="Choose one or more activities that can be safely done on this trail, e.g., hiking, trail running, or mountain biking."
      renderValue={(val, label) => (
        <>
          {label}: &nbsp;
          <ul>
            {val.activity.map((a, i) => (
              <li key={i}>
                {getActivityIcon(a)} &nbsp; {a}
              </li>
            ))}
          </ul>
        </>
      )}
      renderInput={(register, parentId) =>
        isLoadingEnums ? (
          <p>Loading activity options...</p>
        ) : (
          <>
            <p>Suitable for:</p>
            {formEnums.map((a) => {
              const checkboxId = `${parentId}-${a.replace(/\s+/g, "-").toLowerCase()}`;
              return (
                <div key={a}>
                  <input
                    type="checkbox"
                    id={checkboxId}
                    value={a}
                    {...register("activity")}
                  />
                  <label htmlFor={checkboxId}>{a}</label>
                </div>
              );
            })}
          </>
        )
      }
    />
  );
};

export default TrailDetailsActivityField;
