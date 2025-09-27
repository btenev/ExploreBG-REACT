import { ImAccessibility } from "react-icons/im";

import { EditableFieldForm } from "@components/common";
import { useUpdateAccommodationField } from "@hooks/dataHooks/accommodationHooks";
import { useAccommodationAccessForm } from "@hooks/formHooks/accommodationHooks";
import { AccessibilityEnum } from "@types";

interface Props {
  accommodationId: number;
  initialValue: AccessibilityEnum;
  canEdit: boolean;
  formEnums: AccessibilityEnum[];
  isLoadingEnums: boolean;
}

const AccommodationDetailsAccess = ({
  accommodationId,
  initialValue,
  canEdit,
  formEnums,
  isLoadingEnums,
}: Props) => {
  const mutation = useUpdateAccommodationField("access", accommodationId);
  return (
    <EditableFieldForm
      label="Accessibility"
      initialValue={{ access: initialValue }}
      canEdit={canEdit}
      useFormHook={useAccommodationAccessForm}
      mutation={mutation}
      helperMessage="Select the accessibility type. 'By car' implies the accommodation is also accessible on foot."
      renderValue={(val, label) => (
        <p>
          <ImAccessibility />
          &nbsp; {label}: &nbsp;
          {val.access === "By car" ? "By car and on foot" : val.access}
        </p>
      )}
      renderInput={(register, id) =>
        isLoadingEnums ? (
          <p>Loading accessibility options...</p>
        ) : (
          <select id={id} {...register("access")}>
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

export default AccommodationDetailsAccess;
