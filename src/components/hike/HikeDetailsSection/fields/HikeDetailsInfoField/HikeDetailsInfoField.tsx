import { EditableTextareaFieldForm } from "@components/common";
import { HIKE_INFO_VISIBLE_TEXT_LENGHT } from "@constants";
import { useUpdateHikeField } from "@hooks/dataHooks/hikeHooks";
import { useHikeInfoForm } from "@hooks/formHooks/hikeHooks";

interface Props {
  hikeId: number;
  hikeInfo: string;
  canEdit: boolean;
}

const HikeDetailsInfoField = ({ hikeId, hikeInfo, canEdit }: Props) => {
  const mutation = useUpdateHikeField("hikeInfo", hikeId);
  return (
    <EditableTextareaFieldForm
      initialValue={{ hikeInfo: hikeInfo }}
      canEdit={canEdit}
      visibleTextLenght={HIKE_INFO_VISIBLE_TEXT_LENGHT}
      useFormHook={useHikeInfoForm}
      mutation={mutation}
    />
  );
};

export default HikeDetailsInfoField;
