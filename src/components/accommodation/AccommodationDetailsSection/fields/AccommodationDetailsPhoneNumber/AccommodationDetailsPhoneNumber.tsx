import { MdPhone } from "react-icons/md";

import { EditableFieldForm } from "@components/common";
import { useUpdateAccommodationField } from "@hooks/dataHooks/accommodationHooks";
import { usePhoneNumberForm } from "@hooks/formHooks/accommodationHooks";

interface Props {
  accommodationId: number;
  initialValue: string | null;
  canEdit: boolean;
}

const AccommodationDetailsPhoneNumber = ({
  accommodationId,
  initialValue,
  canEdit,
}: Props) => {
  const mutation = useUpdateAccommodationField("phoneNumber", accommodationId);
  return (
    <EditableFieldForm
      label="Phone"
      initialValue={{ phoneNumber: initialValue }}
      canEdit={canEdit}
      useFormHook={usePhoneNumberForm}
      mutation={mutation}
      inputType="tel"
      renderValue={(val, label) => (
        <p>
          <MdPhone />
          &nbsp; {label}: &nbsp;
          {val ? <a href={`tel:${val}`}>{val}</a> : "Not available"}
        </p>
      )}
    />
  );
};

export default AccommodationDetailsPhoneNumber;
