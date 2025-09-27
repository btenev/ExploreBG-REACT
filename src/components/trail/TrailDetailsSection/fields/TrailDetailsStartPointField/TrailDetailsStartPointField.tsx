import { EditableFieldForm } from "@components/common";
import { useUpdateHikingTrailField } from "@hooks/dataHooks/trailHooks";
import { StartPointDto, useStartPointForm } from "@hooks/formHooks/trailHooks";

interface Props {
  trailId: number;
  initialValue: string;
  canEdit: boolean;
}

const TrailDetailsStartPointField = ({
  trailId,
  initialValue,
  canEdit,
}: Props) => {
  const mutation = useUpdateHikingTrailField("startPoint", trailId);

  return (
    <EditableFieldForm<StartPointDto>
      label="From"
      initialValue={{ startPoint: initialValue }}
      canEdit={canEdit}
      useFormHook={useStartPointForm}
      mutation={mutation}
      renderValue={(val, label) => (
        <details open>
          <summary>
            {label}:&nbsp; <strong>{val.startPoint}</strong>
          </summary>
        </details>
      )}
      renderInput={(register, id) => (
        <input
          id={id}
          {...register("startPoint")}
          placeholder="Start point name"
          type="text"
        />
      )}
    />
  );
};

export default TrailDetailsStartPointField;
