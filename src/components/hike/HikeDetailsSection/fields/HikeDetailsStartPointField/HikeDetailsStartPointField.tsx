import { EditableFieldForm } from "@components/common";
import { useUpdateHikeField } from "@hooks/dataHooks/hikeHooks";
import { useStartPointForm, StartPointDto } from "@hooks/formHooks/hikeHooks";

interface Props {
  hikeId: number;
  startPoint: string;
  canEdit: boolean;
}

const HikeDetailsStartPointField = ({ hikeId, startPoint, canEdit }: Props) => {
  const mutation = useUpdateHikeField("startPoint", hikeId);

  return (
    <EditableFieldForm<StartPointDto>
      label="From"
      initialValue={{ startPoint: startPoint }}
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

export default HikeDetailsStartPointField;
