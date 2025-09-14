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
      label="price per bed"
      initialValue={{ pricePerBed: initialValue }}
      canEdit={canEdit}
      useFormHook={usePricePerBedForm}
      mutation={mutation}
      inputType="number"
      renderValue={(val) => {
        const numericVal = val !== null ? Number(val) : null;

        return (
          <p>
            <FaMoneyBillWave />
            &nbsp; Price per bed: &nbsp;
            {numericVal !== null && !isNaN(numericVal)
              ? `${numericVal.toFixed(2)} BGN`
              : "not available"}
          </p>
        );
      }}
      renderInput={(fieldKey, register) => (
        <input
          {...register(fieldKey)}
          type="number"
          min={0}
          step={0.01}
          placeholder="0.00"
        />
      )}
    />
  );
};

export default AccommodationDetailsPricePerBed;
