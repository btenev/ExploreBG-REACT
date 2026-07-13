import { JSX } from "react";
import { FaHouse, FaPersonShelter } from "react-icons/fa6";
import { GiHut, GiCampingTent } from "react-icons/gi";

import { EditableFieldForm } from "@components/common";
import { useUpdateAccommodationField } from "@hooks/dataHooks/accommodationHooks";
import { useAccommodationType } from "@hooks/formHooks/accommodationHooks";
import { AccommodationTypeEnum } from "@types";

const typeIcons: Record<AccommodationTypeEnum, JSX.Element> = {
  Hut: <GiHut />,
  "Guest house": <FaHouse />,
  Shelter: <FaPersonShelter />,
  Camping: <GiCampingTent />,
};

interface Props {
  accommodationId: number;
  initialValue: AccommodationTypeEnum;
  canEdit: boolean;
  formEnums: AccommodationTypeEnum[];
  isLoadingEnums: boolean;
}

const AccommodationDetailsType = ({
  accommodationId,
  initialValue,
  canEdit,
  formEnums,
  isLoadingEnums,
}: Props) => {
  const mutation = useUpdateAccommodationField("type", accommodationId);

  return (
    <EditableFieldForm
      label="Accommodation type"
      initialValue={{ type: initialValue }}
      canEdit={canEdit}
      useFormHook={useAccommodationType}
      mutation={mutation}
      helperMessage="Select the type of accommodation."
      renderValue={(val, label) => (
        <p>
          {typeIcons[val.type] ?? null}&nbsp; {label}: &nbsp;{val.type}
        </p>
      )}
      renderInput={(register, id) =>
        isLoadingEnums ? (
          <p>Loading accommodation type options...</p>
        ) : (
          <select id={id} {...register("type")}>
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

export default AccommodationDetailsType;
