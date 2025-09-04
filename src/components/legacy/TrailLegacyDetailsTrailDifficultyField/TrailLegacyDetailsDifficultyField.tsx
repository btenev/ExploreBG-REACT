import { useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { GiHiking } from "react-icons/gi";

import {
  TrailDifficultyDto,
  useTrailDifficultyForm,
} from "../../../hooks/formHooks/trailHooks/useTrailDifficultyForm";
import { useLegacyUpdateHikingTrailField } from "../../../hooks/legacy";
import useCloseOnEscapeTabAndClickOutside from "../../../hooks/uiHooks/useCloseOnEscapeTabAndClickOutside";
import { DifficultyLevelEnum } from "../../../types";
import { SubmitButton } from "../../common";

interface Props {
  initialTrailDifficulty: DifficultyLevelEnum;
  trailId: number;
  canEdit: boolean;
  formEnums: DifficultyLevelEnum[];
  isLoadingEnums: boolean;
}

const TrailLegacyDetailsDifficultyField = ({
  initialTrailDifficulty,
  trailId,
  canEdit,
  formEnums,
  isLoadingEnums,
}: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [trailDifficulty, setTrailDifficulty] = useState<DifficultyLevelEnum>(
    initialTrailDifficulty
  );
  const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit } = useTrailDifficultyForm();
  const { mutate: updateTrailDifficulty, isPending } =
    useLegacyUpdateHikingTrailField(
      "trailDifficulty",
      trailId,
      setTrailDifficulty
    );

  const repeatIcon = (end: number) => {
    const icons = [];
    for (let i = 1; i <= end; i++) {
      icons.push(
        <span key={i}>
          <GiHiking />
        </span>
      );
    }

    return icons;
  };

  const maxDifficultyLevel = formEnums?.length;

  const onSubmit = (data: TrailDifficultyDto) => {
    if (data.trailDifficulty === trailDifficulty) {
      setIsVisible(false);
      return;
    }

    updateTrailDifficulty(data);
    setIsVisible(false);
  };

  useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));
  return (
    <div className="trail__pair__field-wrapper">
      <div
        style={{ opacity: isVisible ? "0" : "1" }}
        className="trail__pair__field-wrapper__field"
      >
        <div className="trail__pair__difficulty">
          <p>difficulty</p>:&nbsp;&nbsp;
          <div>{repeatIcon(Number(trailDifficulty))}</div>
          <div className="trail__pair__difficulty__empty">
            {repeatIcon(maxDifficultyLevel - Number(trailDifficulty))}
          </div>
        </div>
        {canEdit && (
          <FaEdit
            className="trail-edit-icon"
            style={{ cursor: isVisible ? "none" : "pointer" }}
            onClick={() => {
              if (!isLoadingEnums) setIsVisible(!isVisible);
            }}
          />
        )}
      </div>

      <div className="trail__pair__field-wrapper__form">
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: isVisible ? "flex" : "none" }}
        >
          {isLoadingEnums ? (
            <p>Loading trail difficulty options...</p>
          ) : (
            <>
              <select
                id="trailDifficulty"
                defaultValue={trailDifficulty}
                {...register("trailDifficulty", { valueAsNumber: true })}
                aria-label="Select trail difficulty"
              >
                {formEnums.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>

              <SubmitButton isSubmitting={isPending} buttonName="Change" />
              <button type="button" onClick={() => setIsVisible(!isVisible)}>
                Cancel
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default TrailLegacyDetailsDifficultyField;
