import { useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";

import {
  StartPointDto,
  useStartPointForm,
} from "../../../hooks/formHooks/trailHooks";
import { useLegacyUpdateHikingTrailField } from "../../../hooks/legacy";
import useCloseOnEscapeTabAndClickOutside from "../../../hooks/uiHooks/useCloseOnEscapeTabAndClickOutside";
import { SubmitButton } from "../../common";

interface Props {
  initialStartPoint: string;
  trailId: number;
  isTrailOwner: boolean;
}

const TrailLegacyDetailsStartPointField = ({
  initialStartPoint,
  trailId,
  isTrailOwner,
}: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [startPoint, setStartPoint] = useState<string>(initialStartPoint);
  const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit, errors } = useStartPointForm();
  const { mutate: updateStartPoint, isPending } =
    useLegacyUpdateHikingTrailField("startPoint", trailId, setStartPoint);

  const onSubmit = (data: StartPointDto) => {
    if (data.startPoint === startPoint) {
      setIsVisible(false);
      return;
    }

    updateStartPoint(data);
    setIsVisible(false);
  };

  useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));
  return (
    <div className="trail__pair__field-wrapper">
      <div
        className="trail__pair__field-wrapper__field"
        style={{ opacity: isVisible ? "0" : "1" }}
      >
        <details open>
          <summary>
            from: <strong>{startPoint}</strong>
          </summary>
          {/* <GrMapLocation />&nbsp; 018293794663487685 */}
        </details>
        {isTrailOwner && (
          <FaEdit
            onClick={() => setIsVisible(!isVisible)}
            className="trail-edit-icon"
            style={{ cursor: isVisible ? "none" : "pointer" }}
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
            id="startPoint"
            type="text"
            {...register("startPoint")}
            defaultValue={startPoint}
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
          {errors.startPoint && errors.startPoint.message}
        </div>
      </div>
    </div>
  );
};

export default TrailLegacyDetailsStartPointField;
