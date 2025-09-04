import { EditableFieldForm } from "@components/common";
import { useUpdateHikingTrailField } from "@hooks/dataHooks/trailHooks";
import { EndPointDto, useEndPointForm } from "@hooks/formHooks/trailHooks";

interface Props {
  trailId: number;
  initialValue: string;
  canEdit: boolean;
}

const TrailDetailsEndPointField = ({
  trailId,
  initialValue,
  canEdit,
}: Props) => {
  // Mutation for updating the endPoint field
  const mutation = useUpdateHikingTrailField("endPoint", trailId);

  return (
    <EditableFieldForm<EndPointDto>
      label="to"
      initialValue={{ endPoint: initialValue }}
      canEdit={canEdit}
      useFormHook={useEndPointForm}
      mutation={mutation}
      inputType="text"
    />
  );
};

export default TrailDetailsEndPointField;
