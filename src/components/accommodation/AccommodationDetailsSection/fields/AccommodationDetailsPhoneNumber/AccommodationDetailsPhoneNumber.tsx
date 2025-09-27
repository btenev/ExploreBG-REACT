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
      helperMessage="Valid phone: +359 (intl) or 0 (local), codes 87/88/89/98/99. E.g., +359871234567 or 0871234567."
      renderValue={(val, label) => (
        <p>
          <MdPhone />
          &nbsp; {label}: &nbsp;
          {val?.phoneNumber ? (
            <a href={`tel:${val.phoneNumber}`}>{val.phoneNumber}</a>
          ) : (
            "Not available"
          )}
        </p>
      )}
      renderInput={(register, id) => (
        <input
          id={id}
          {...register("phoneNumber")}
          placeholder="Phone number"
          type="tel"
        />
      )}
    />
  );
};

export default AccommodationDetailsPhoneNumber;
