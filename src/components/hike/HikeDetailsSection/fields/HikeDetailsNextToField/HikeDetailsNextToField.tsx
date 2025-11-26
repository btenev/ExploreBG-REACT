import { FaBuilding } from "react-icons/fa";

import { EditableFieldForm } from "@components/common";
import { useUpdateHikeField } from "@hooks/dataHooks/hikeHooks";
import { HikeNextToDto, useHikeNextToForm } from "@hooks/formHooks/hikeHooks";

interface Props {
  hikeId: number;
  nextTo: string;
  canEdit: boolean;
}

const HikeDetailsNextToField = ({ hikeId, nextTo, canEdit }: Props) => {
  const mutation = useUpdateHikeField("nextTo", hikeId);

  return (
    <EditableFieldForm<HikeNextToDto>
      label="Next to"
      initialValue={{ nextTo: nextTo }}
      canEdit={canEdit}
      useFormHook={useHikeNextToForm}
      mutation={mutation}
      helperMessage="The name of a village, town or city close to the hike."
      renderValue={(val, label) => (
        <p>
          <FaBuilding />
          &nbsp; {label}: &nbsp;
          {val.nextTo}
        </p>
      )}
      renderInput={(register, id) => (
        <input id={id} {...register("nextTo")} type="text" />
      )}
    />
  );
};

export default HikeDetailsNextToField;
