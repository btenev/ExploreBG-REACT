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
      helperMessage="Optional: official website or booking page for the accommodation."
      renderValue={(val, label) => (
        <p>
          <FaGlobe />
          &nbsp; {label}: &nbsp;
          {val?.site ? (
            <a href={val.site} target="_blank" rel="noopener noreferrer">
              {val.site}
            </a>
          ) : (
            "Not available"
          )}
        </p>
      )}
      renderInput={(register, id) => (
        <input
          id={id}
          {...register("site")}
          placeholder="Site url"
          type="text"
        />
      )}
    />
  );
};

export default AccommodationDetailsSite;
