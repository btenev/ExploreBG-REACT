import { EditableTextareaFieldForm } from "@components/common";
import { ACCOMMODATION_INFO_VISIBLE_TEXT_LENGHT } from "@constants";
import { useUpdateAccommodationField } from "@hooks/dataHooks/accommodationHooks";
import { useAccommodationInfoForm } from "@hooks/formHooks/accommodationHooks";

interface Props {
  accommodationId: number;
  initialValue: string;
  canEdit: boolean;
}

const AccommodationDetailsInfo = ({
  accommodationId,
  initialValue,
  canEdit,
}: Props) => {
  const mutation = useUpdateAccommodationField(
    "accommodationInfo",
    accommodationId
  );
  return (
    <EditableTextareaFieldForm
      initialValue={{ accommodationInfo: initialValue }}
      canEdit={canEdit}
      visibleTextLenght={ACCOMMODATION_INFO_VISIBLE_TEXT_LENGHT}
      useFormHook={useAccommodationInfoForm}
      mutation={mutation}
    />
  );
};

export default AccommodationDetailsInfo;
