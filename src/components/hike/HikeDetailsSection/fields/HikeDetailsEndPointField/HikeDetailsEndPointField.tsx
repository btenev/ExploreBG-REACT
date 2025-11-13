import { EditableFieldForm } from "@components/common";
import { useUpdateHikeField } from "@hooks/dataHooks/hikeHooks";
import { EndPointDto, useEndPointForm } from "@hooks/formHooks/hikeHooks";

interface Props {
  hikeId: number;
  endPoint: string;
  canEdit: boolean;
}

const HikeDetailsEndPointField = ({ hikeId, endPoint, canEdit }: Props) => {
  const mutation = useUpdateHikeField("endPoint", hikeId);

  return (
    <EditableFieldForm<EndPointDto>
      label="To"
      initialValue={{ endPoint: endPoint }}
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

export default HikeDetailsEndPointField;
