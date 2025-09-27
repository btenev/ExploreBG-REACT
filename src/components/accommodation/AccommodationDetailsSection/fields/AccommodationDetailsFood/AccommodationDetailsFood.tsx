import { GiKnifeFork } from "react-icons/gi";

import { EditableFieldForm } from "@components/common";
import { useUpdateAccommodationField } from "@hooks/dataHooks/accommodationHooks";
import { useFoodAvailableForm } from "@hooks/formHooks/accommodationHooks";
import { FoodAvailabilityEnum } from "@types";

interface Props {
  accommodationId: number;
  initialValue: FoodAvailabilityEnum;
  canEdit: boolean;
  formEnums: FoodAvailabilityEnum[];
  isLoadingEnums: boolean;
}

const AccommodationDetailsFood = ({
  accommodationId,
  initialValue,
  canEdit,
  formEnums,
  isLoadingEnums,
}: Props) => {
  const mutation = useUpdateAccommodationField(
    "availableFood",
    accommodationId
  );
  return (
    <EditableFieldForm
      label="Food"
      initialValue={{ availableFood: initialValue }}
      canEdit={canEdit}
      useFormHook={useFoodAvailableForm}
      mutation={mutation}
      helperMessage="Indicates whether food is available at the accommodation."
      renderValue={(val, label) => (
        <p>
          <GiKnifeFork />
          &nbsp; {label}: &nbsp;
          {val.availableFood}
        </p>
      )}
      renderInput={(register, id) =>
        isLoadingEnums ? (
          <p>Loading food availability options...</p>
        ) : (
          <select id={id} {...register("availableFood")}>
            {formEnums.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        )
      }
    />
  );
};

export default AccommodationDetailsFood;
