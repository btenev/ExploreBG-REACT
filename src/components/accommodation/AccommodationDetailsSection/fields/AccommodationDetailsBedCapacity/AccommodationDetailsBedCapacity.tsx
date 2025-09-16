import { FaBed } from "react-icons/fa";

import { EditableFieldForm } from "@components/common";
import { useUpdateAccommodationField } from "@hooks/dataHooks/accommodationHooks";
import { useBedCapacityForm } from "@hooks/formHooks/accommodationHooks";

interface Props {
  accommodationId: number;
  initialValue: number | null;
  canEdit: boolean;
}

const AccommodationDetailsBedCapacity = ({
  accommodationId,
  initialValue,
  canEdit,
}: Props) => {
  const mutation = useUpdateAccommodationField("bedCapacity", accommodationId);
  return (
    <EditableFieldForm
      label="Bed capacity"
      initialValue={{ bedCapacity: initialValue }}
      canEdit={canEdit}
      useFormHook={useBedCapacityForm}
      mutation={mutation}
      inputType="number"
      renderValue={(val, label) => (
        <p>
          <FaBed />
          &nbsp; {label}: &nbsp;
          {val !== null
            ? `${val} ${val === 1 ? "bed" : "beds"}`
            : "Not available"}
        </p>
      )}
    />
  );
};

export default AccommodationDetailsBedCapacity;
