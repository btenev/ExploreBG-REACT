import { FaGlobe } from "react-icons/fa";

import { EditableFieldForm } from "@components/common";
import { useUpdateAccommodationField } from "@hooks/dataHooks/accommodationHooks";
import { useSiteForm } from "@hooks/formHooks/accommodationHooks";

interface Props {
  accommodationId: number;
  initialValue: string | null;
  canEdit: boolean;
}

const AccommodationDetailsSite = ({
  accommodationId,
  initialValue,
  canEdit,
}: Props) => {
  const mutation = useUpdateAccommodationField("site", accommodationId);

  return (
    <EditableFieldForm
      label="Site"
      initialValue={{ site: initialValue }}
      canEdit={canEdit}
      useFormHook={useSiteForm}
      mutation={mutation}
      inputType="text"
      renderValue={(val, label) => (
        <p>
          <FaGlobe />
          &nbsp; {label}: &nbsp;
          {val ? (
            <a href={val} target="_blank" rel="noopener noreferrer">
              {val}
            </a>
          ) : (
            "Not available"
          )}
        </p>
      )}
    />
  );
};

export default AccommodationDetailsSite;
