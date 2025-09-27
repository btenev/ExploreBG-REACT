import { EditableFieldForm } from "@components/common";
import { useUpdateDestinationField } from "@hooks/dataHooks/destinationHooks";
import {
  DestinationNameDto,
  useDestinationNameForm,
} from "@hooks/formHooks/destinationHooks";

interface Props {
  destinationId: number;
  initialValue: string;
  canEdit: boolean;
}

const DestinationDetailsName = ({
  destinationId,
  initialValue,
  canEdit,
}: Props) => {
  const mutation = useUpdateDestinationField("destinationName", destinationId);
  return (
    <EditableFieldForm<DestinationNameDto>
      label="Destination name"
      initialValue={{ destinationName: initialValue }}
      canEdit={canEdit}
      useFormHook={useDestinationNameForm}
      mutation={mutation}
      renderValue={(val, label) => (
        <details open>
          <summary>
            {label}: <strong>{val.destinationName}</strong>
          </summary>
        </details>
      )}
      renderInput={(register, id) => (
        <input
          id={id}
          {...register("destinationName")}
          placeholder="Destination name"
          type="text"
        />
      )}
    />
  );
};

export default DestinationDetailsName;
