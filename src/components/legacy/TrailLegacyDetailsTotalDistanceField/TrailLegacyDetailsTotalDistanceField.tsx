import { useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";

import {
  TotalDistanceDto,
  useTotalDistanceForm,
} from "../../../hooks/formHooks/trailHooks";
import { useLegacyUpdateHikingTrailField } from "../../../hooks/legacy";
import useCloseOnEscapeTabAndClickOutside from "../../../hooks/uiHooks/useCloseOnEscapeTabAndClickOutside";
import { SubmitButton } from "../../common";

interface Props {
  initialTotalDistance: number | null;
  trailId: number;
  canEdit: boolean;
}

const TrailLegacyDetailsTotalDistanceField = ({
  initialTotalDistance,
  trailId,
  canEdit,
}: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [totalDistance, setTotalDistance] = useState<number | null>(
    initialTotalDistance
  );
  const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit, errors } = useTotalDistanceForm();
  const { mutate: updateTotalDistance, isPending } =
    useLegacyUpdateHikingTrailField("totalDistance", trailId, setTotalDistance);

  const onSubmit = (data: TotalDistanceDto) => {
    if (data.totalDistance === totalDistance) {
      setIsVisible(false);
      return;
    }

    updateTotalDistance(data);
    setIsVisible(false);
  };

  useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));
  return (
    <div className="trail__pair__field-wrapper">
      <div className="trail__pair__field-wrapper__field">
        <p>
          <GiPathDistance />
          &nbsp; distance: &nbsp;
          {totalDistance ? `${totalDistance} km` : "not available"}
        </p>
        {canEdit && (
          <FaEdit
            className="trail-edit-icon"
            onClick={() => setIsVisible(!isVisible)}
          />
        )}
      </div>

      <div className="trail__pair__field-wrapper__form">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          ref={formRef}
          style={{ display: isVisible ? "flex" : "none" }}
        >
          <input
            id="totalDistance"
            type="number"
            {...register("totalDistance")}
            defaultValue={totalDistance ?? ""}
          />

          <SubmitButton isSubmitting={isPending} buttonName="Change" />
          <button type="button" onClick={() => setIsVisible(!isVisible)}>
            Cancel
          </button>
        </form>

        <div
          style={{ display: isVisible ? "block" : "none" }}
          className="error-message"
        >
          {errors.totalDistance && errors.totalDistance.message}
        </div>
      </div>
    </div>
  );
};

export default TrailLegacyDetailsTotalDistanceField;
