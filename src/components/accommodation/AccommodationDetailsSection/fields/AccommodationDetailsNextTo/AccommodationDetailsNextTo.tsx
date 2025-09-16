import { FaBuilding } from "react-icons/fa";

import { EditableFieldForm } from "@components/common";
import { useUpdateAccommodationField } from "@hooks/dataHooks/accommodationHooks";
import { useAccommodationNextToForm } from "@hooks/formHooks/accommodationHooks";

interface Props {
  accommodationId: number;
  initialValue: string;
  canEdit: boolean;
}

const AccommodationDetailsNextTo = ({
  accommodationId,
  initialValue,
  canEdit,
}: Props) => {
  const mutation = useUpdateAccommodationField("nextTo", accommodationId);
  return (
    <EditableFieldForm
      label="Next to"
      initialValue={{ nextTo: initialValue }}
      canEdit={canEdit}
      useFormHook={useAccommodationNextToForm}
      mutation={mutation}
      inputType="text"
      renderValue={(val, label) => (
        <p>
          <FaBuilding />
          &nbsp; {label}: &nbsp;
          {val}
        </p>
      )}
    />
  );
};

export default AccommodationDetailsNextTo;
