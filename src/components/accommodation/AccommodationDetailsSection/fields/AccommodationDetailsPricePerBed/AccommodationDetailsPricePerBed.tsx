import { FaMoneyBillWave } from "react-icons/fa";

import { EditableFieldForm } from "@components/common";
import { useUpdateAccommodationField } from "@hooks/dataHooks/accommodationHooks";
import { usePricePerBedForm } from "@hooks/formHooks/accommodationHooks";

interface Props {
  accommodationId: number;
  initialValue: number | null;
  canEdit: boolean;
}

const AccommodationDetailsPricePerBed = ({
  accommodationId,
  initialValue,
  canEdit,
}: Props) => {
  const mutation = useUpdateAccommodationField("pricePerBed", accommodationId);
  return (
    <EditableFieldForm
      label="Price per bed"
      initialValue={{ pricePerBed: initialValue }}
      canEdit={canEdit}
      useFormHook={usePricePerBedForm}
      mutation={mutation}
      renderValue={(val, label) => {
        return (
          <p>
            <FaMoneyBillWave />
            &nbsp; {label}: &nbsp;
            {val?.pricePerBed != null
              ? `${val.pricePerBed.toFixed(2)} BGN`
              : "Not available"}
          </p>
        );
      }}
      renderInput={(register, id) => (
        <input
          id={id}
          {...register("pricePerBed", {
            setValueAs: (v) => {
              return v === "" ? null : Number(v);
            },
          })}
          type="number"
          step="0.01"
          placeholder="Not set"
          min="0"
        />
      )}
    />
  );
};

export default AccommodationDetailsPricePerBed;
