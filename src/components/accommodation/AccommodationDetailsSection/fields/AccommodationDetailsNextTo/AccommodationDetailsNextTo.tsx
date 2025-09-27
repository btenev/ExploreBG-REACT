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
      helperMessage="The name of a village, town or city close to the accommodation."
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

export default AccommodationDetailsNextTo;
