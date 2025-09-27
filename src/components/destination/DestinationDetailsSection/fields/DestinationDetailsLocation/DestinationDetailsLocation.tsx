import { FaLocationDot } from "react-icons/fa6";

import { EditableFieldForm } from "@components/common";
import { useUpdateDestinationField } from "@hooks/dataHooks/destinationHooks";
import {
  DestinationLocationDto,
  useDestinationLocationForm,
} from "@hooks/formHooks/destinationHooks";
import { formatCoordinate } from "@utils/mixedUtils";

import "./DestinationDetailsLocation.scss";

interface Props {
  destinationId: number;
  initialValueLatitude: number | null;
  initialValuelogitude: number | null;
  canEdit: boolean;
}

const DestinationDetailsLocation = ({
  destinationId,
  initialValueLatitude,
  initialValuelogitude,
  canEdit,
}: Props) => {
  const mutation = useUpdateDestinationField("location", destinationId);

  return (
    <EditableFieldForm<DestinationLocationDto>
      label="Location"
      initialValue={{
        latitude: initialValueLatitude,
        longitude: initialValuelogitude,
      }}
      canEdit={canEdit}
      useFormHook={useDestinationLocationForm}
      mutation={mutation}
      helperMessage="Enter latitude and longitude in decimal degrees. E.g., 42.123456, 23.456789"
      renderValue={(val, label) => (
        <p>
          <FaLocationDot />
          &nbsp; {label}: &nbsp;
          {val.latitude != null && val.longitude != null
            ? formatCoordinate(val.latitude, val.longitude)
            : "Not available"}
        </p>
      )}
      renderInput={(register) => (
        <div className="location-inputs">
          <input
            {...register("latitude")}
            placeholder="Latitude"
            type="number"
            step="0.000001"
          />
          <input
            {...register("longitude")}
            placeholder="Longitude"
            type="number"
            step="0.000001"
          />
        </div>
      )}
    />
  );
};

export default DestinationDetailsLocation;
