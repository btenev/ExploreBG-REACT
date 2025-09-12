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
      label="phone number"
      initialValue={{ phoneNumber: initialValue }}
      canEdit={canEdit}
      useFormHook={usePhoneNumberForm}
      mutation={mutation}
      inputType="tel"
      renderValue={(val) => (
        <p>
          <MdPhone />
          &nbsp; tel: &nbsp;
          {val ? <a href={`tel:${val}`}>{val}</a> : "not available"}
        </p>
      )}
    />
  );
};

export default AccommodationDetailsPhoneNumber;
