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
      label="activity"
      initialValue={{ activity: initialValue }}
      canEdit={canEdit}
      formClassName="editable-field__form__checkbox"
      useFormHook={useActivityForm}
      mutation={mutation}
      renderValue={(val) => (
        <>
          suitable for: &nbsp;
          <ul>
            {(val as SuitableForEnum[]).map((a, i) => (
              <li key={i}>
                {getActivityIcon(a)} &nbsp; {a}
              </li>
            ))}
          </ul>
        </>
      )}
      renderInput={(fieldKey, register) =>
        isLoadingEnums ? (
          <p>Loading activity options...</p>
        ) : (
          <>
            <p>suitable for:</p>
            {formEnums.map((a) => (
              <div key={a}>
                <input
                  type="checkbox"
                  id={`activity-${a}`}
                  value={a}
                  {...register(fieldKey)}
                />
                <label htmlFor={`activity-${a}`}>{a}</label>
              </div>
            ))}
          </>
        )
      }
    />
  );
};

export default TrailDetailsActivityField;
