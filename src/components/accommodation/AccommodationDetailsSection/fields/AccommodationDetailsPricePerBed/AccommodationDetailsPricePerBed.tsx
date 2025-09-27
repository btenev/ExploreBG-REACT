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
        const numericVal =
          val?.pricePerBed !== null ? Number(val.pricePerBed) : null;

        return (
          <p>
            <FaMoneyBillWave />
            &nbsp; {label}: &nbsp;
            {numericVal !== null && !isNaN(numericVal)
              ? `${numericVal.toFixed(2)} BGN`
              : "Not available"}
          </p>
        );
      }}
      renderInput={(register) => (
        <input
          {...register("pricePerBed")}
          type="number"
          step={0.01}
          placeholder="0.00"
        />
      )}
    />
  );
};

export default AccommodationDetailsPricePerBed;
