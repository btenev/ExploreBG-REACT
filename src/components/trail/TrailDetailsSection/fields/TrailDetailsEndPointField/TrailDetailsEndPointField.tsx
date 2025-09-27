import { EditableFieldForm } from "@components/common";
import { useUpdateHikingTrailField } from "@hooks/dataHooks/trailHooks";
import { EndPointDto, useEndPointForm } from "@hooks/formHooks/trailHooks";

interface Props {
  trailId: number;
  initialValue: string;
  canEdit: boolean;
}

const TrailDetailsEndPointField = ({
  trailId,
  initialValue,
  canEdit,
}: Props) => {
  const mutation = useUpdateHikingTrailField("endPoint", trailId);

  return (
    <EditableFieldForm<EndPointDto>
      label="To"
      initialValue={{ endPoint: initialValue }}
      canEdit={canEdit}
      useFormHook={useEndPointForm}
      mutation={mutation}
      renderValue={(val, label) => (
        <details open>
          <summary>
            {label}:&nbsp; <strong>{val.endPoint}</strong>
          </summary>
        </details>
      )}
      renderInput={(register, id) => (
        <input
          id={id}
          {...register("endPoint")}
          placeholder="End point name"
          type="text"
        />
      )}
    />
  );
};

export default TrailDetailsEndPointField;
