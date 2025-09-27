import { FaBuilding } from "react-icons/fa";

import { EditableFieldForm } from "@components/common";
import { useUpdateDestinationField } from "@hooks/dataHooks/destinationHooks";
import {
  DestinationNextToDto,
  useDestinationNextToForm,
} from "@hooks/formHooks/destinationHooks";

interface Props {
  destinationId: number;
  initialValue: string;
  canEdit: boolean;
}

const DestinationDetailsNextTo = ({
  destinationId,
  initialValue,
  canEdit,
}: Props) => {
  const mutation = useUpdateDestinationField("nextTo", destinationId);

  return (
    <EditableFieldForm<DestinationNextToDto>
      label="Next to"
      initialValue={{ nextTo: initialValue }}
      canEdit={canEdit}
      useFormHook={useDestinationNextToForm}
      mutation={mutation}
      helperMessage="The name of a village, town or city close to the destination."
      renderValue={(val, label) => (
        <p>
          <FaBuilding />
          &nbsp; {label}: &nbsp;
          {val.nextTo}
        </p>
      )}
      renderInput={(register, id) => (
        <input id={id} {...register("nextTo")} type="text" />
      )}
    />
  );
};

export default DestinationDetailsNextTo;
