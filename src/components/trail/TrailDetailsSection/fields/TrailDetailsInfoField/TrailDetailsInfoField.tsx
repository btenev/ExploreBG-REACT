import { EditableTextareaFieldForm } from "@components/common";
import { TRAIL_INFO_VISIBLE_TEXT_LENGHT } from "@constants";
import { useUpdateHikingTrailField } from "@hooks/dataHooks/trailHooks";
import { useTrailInfoForm } from "@hooks/formHooks/trailHooks";

interface Props {
  trailId: number;
  initialValue: string;
  canEdit: boolean;
}

const TrailDetailsInfoField = ({ trailId, initialValue, canEdit }: Props) => {
  const mutation = useUpdateHikingTrailField("trailInfo", trailId);

  return (
    <EditableTextareaFieldForm
      initialValue={{ trailInfo: initialValue }}
      canEdit={canEdit}
      visibleTextLenght={TRAIL_INFO_VISIBLE_TEXT_LENGHT}
      useFormHook={useTrailInfoForm}
      mutation={mutation}
    />
  );
};

export default TrailDetailsInfoField;
