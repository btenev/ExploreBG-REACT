import { EditableFieldForm } from "@components/common";
import { useUpdateHikingTrailField } from "@hooks/dataHooks/trailHooks";
import { StartPointDto, useStartPointForm } from "@hooks/formHooks/trailHooks";

interface Props {
  trailId: number;
  initialValue: string;
  canEdit: boolean;
}

const TrailDetailsStartPointField = ({
  trailId,
  initialValue,
  canEdit,
}: Props) => {
  // Mutation for updating the startPoint field
  const mutation = useUpdateHikingTrailField("startPoint", trailId);

  return (
    <EditableFieldForm<StartPointDto>
      label="from"
      initialValue={{ startPoint: initialValue }}
      canEdit={canEdit}
      useFormHook={useStartPointForm}
      mutation={mutation}
      inputType="text"
    />
  );
};

export default TrailDetailsStartPointField;
