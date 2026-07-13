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
      helperMessage="Enter the total number of beds in the accommodation."
      renderValue={(val, label) => (
        <p>
          <FaBed />
          &nbsp; {label}: &nbsp;
          {val?.bedCapacity !== null
            ? `${val.bedCapacity} bed${val.bedCapacity === 1 ? "" : "s"}`
            : "Not available"}
        </p>
      )}
      renderInput={(register, id) => (
        <input
          id={id}
          {...register("bedCapacity", {
            setValueAs: (v) => (v === "" ? null : Number(v)),
          })}
          type="number"
          step="1"
          min="0"
          placeholder="Not set"
        />
      )}
    />
  );
};

export default AccommodationDetailsBedCapacity;
