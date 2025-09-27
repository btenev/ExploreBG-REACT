import { JSX } from "react";
import { FaTree } from "react-icons/fa6";
import { GiPisaTower } from "react-icons/gi";

import { EditableFieldForm } from "@components/common";
import { useUpdateDestinationField } from "@hooks/dataHooks/destinationHooks";
import {
  DestinationTypeDto,
  useDestinationTypeForm,
} from "@hooks/formHooks/destinationHooks";
import { DestinationTypeEnum } from "@types";

const typeIcons: Record<DestinationTypeEnum, JSX.Element> = {
  "Natural attraction": <FaTree />,
  "Cultural heritage": <GiPisaTower />,
};

interface Props {
  destinationId: number;
  initialValue: DestinationTypeEnum;
  canEdit: boolean;
  formEnums: DestinationTypeEnum[];
  isLoadingEnums: boolean;
}

const DestinationDetailsType = ({
  destinationId,
  initialValue,
  canEdit,
  formEnums,
  isLoadingEnums,
}: Props) => {
  const mutation = useUpdateDestinationField("type", destinationId);

  return (
    <EditableFieldForm<DestinationTypeDto>
      label="Destination type"
      initialValue={{ type: initialValue }}
      canEdit={canEdit}
      useFormHook={useDestinationTypeForm}
      mutation={mutation}
      helperMessage="Choose natural (e.g., waterfalls, mountains, lakes) or cultural (e.g., fortresses, churches, museums)."
      renderValue={(val, label) => (
        <p>
          {typeIcons[val.type] ?? null}&nbsp; {label}: &nbsp;{val.type}
        </p>
      )}
      renderInput={(register, id) =>
        isLoadingEnums ? (
          <p>Loading destination type options...</p>
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

export default DestinationDetailsType;
