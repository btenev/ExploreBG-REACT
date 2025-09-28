import { EditableTextareaFieldForm } from "@components/common";
import { DESTINATION_INFO_VISIBLE_TEXT_LENGHT } from "@constants";
import { useUpdateDestinationField } from "@hooks/dataHooks/destinationHooks";
import { useDestinationInfoForm } from "@hooks/formHooks/destinationHooks";

interface Props {
  destinationId: number;
  initialValue: string;
  canEdit: boolean;
}

const DestinationDetailsInfo = ({
  destinationId,
  initialValue,
  canEdit,
}: Props) => {
  const mutation = useUpdateDestinationField("destinationInfo", destinationId);

  return (
    <EditableTextareaFieldForm
      initialValue={{ destinationInfo: initialValue }}
      canEdit={canEdit}
      visibleTextLenght={DESTINATION_INFO_VISIBLE_TEXT_LENGHT}
      useFormHook={useDestinationInfoForm}
      mutation={mutation}
    />
  );
};

export default DestinationDetailsInfo;
