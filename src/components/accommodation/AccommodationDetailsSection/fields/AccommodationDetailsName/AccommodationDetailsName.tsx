import { EditableFieldForm } from "@components/common";
import { useUpdateAccommodationField } from "@hooks/dataHooks/accommodationHooks";
import {
  AccommodationNameDto,
  useAccommodationNameForm,
} from "@hooks/formHooks/accommodationHooks";

interface Props {
  accommodationId: number;
  initialValue: string;
  canEdit: boolean;
}

const AccommodationDetailsName = ({
  accommodationId,
  initialValue,
  canEdit,
}: Props) => {
  const mutation = useUpdateAccommodationField(
    "accommodationName",
    accommodationId
  );

  return (
    <EditableFieldForm<AccommodationNameDto>
      label="Accommodation name"
      initialValue={{ accommodationName: initialValue }}
      canEdit={canEdit}
      useFormHook={useAccommodationNameForm}
      mutation={mutation}
      inputType="text"
    />
  );
};

export default AccommodationDetailsName;
