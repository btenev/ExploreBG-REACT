import { useRef, useState } from "react";
import { FaBiking, FaEdit } from "react-icons/fa";
import { GiHiking } from "react-icons/gi";
import { TbRun } from "react-icons/tb";

import {
  ActivityDto,
  useActivityForm,
} from "../../../hooks/formHooks/trailHooks";
import { useLegacyUpdateHikingTrailField } from "../../../hooks/legacy";
import useCloseOnEscapeTabAndClickOutside from "../../../hooks/uiHooks/useCloseOnEscapeTabAndClickOutside";
import { SuitableForEnum } from "../../../types";
import { SubmitButton } from "../../common";

const ACTIVITY_ICONS = {
  hiking: <GiHiking />,
  "trail-running": <TbRun />,
  "mountain-biking": <FaBiking />,
};

const getActivityIcon = (activity: string) =>
  ACTIVITY_ICONS[activity.toLowerCase() as keyof typeof ACTIVITY_ICONS];

interface Props {
  initialActivity: SuitableForEnum[];
  trailId: number;
  canEdit: boolean;
  formEnums: SuitableForEnum[];
  isLoadingEnums: boolean;
}

const TrailLegacyDetailsActivityField = ({
  initialActivity,
  trailId,
  canEdit,
  formEnums,
  isLoadingEnums,
}: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [submittedActivity, setSubmittedActivity] =
    useState<SuitableForEnum[]>(initialActivity);
  const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit, errors } = useActivityForm();
  const { mutate: updateActivity, isPending } = useLegacyUpdateHikingTrailField(
    "activity",
    trailId,
    setSubmittedActivity
  );

  const areActivitiesEqual = (a: SuitableForEnum[], b: SuitableForEnum[]) => {
    return JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
  };

  const onSubmit = (data: ActivityDto) => {
    const selected = data.activity ?? [];

    if (areActivitiesEqual(selected, submittedActivity)) {
      setIsVisible(false);
      return;
    }

    updateActivity(data);
    setIsVisible(false);
  };

  useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));
  return (
    <div className="trail__pair__field-wrapper">
      <div
        className="trail__pair__field-wrapper__ul"
        style={{ opacity: isVisible ? "0" : "1" }}
      >
        suitable for:
        {canEdit && (
          <FaEdit
            className="trail-edit-icon"
            style={{ cursor: isVisible ? "none" : "pointer" }}
            onClick={() => {
              if (!isLoadingEnums) setIsVisible(!isVisible);
            }}
          />
        )}
        <ul>
          {submittedActivity.map((a, index) => (
            <li key={index}>
              {getActivityIcon(a)} &nbsp; {a}
            </li>
          ))}
        </ul>
      </div>

      <div className="trail__pair__field-wrapper__form">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          ref={formRef}
          className="trail__pair__field-wrapper__form__checkbox"
          style={{ display: isVisible ? "flex" : "none" }}
        >
          {isLoadingEnums ? (
            <p>Loading activity options...</p>
          ) : (
            <>
              <p>suitable for:</p>
              {formEnums.map((a) => (
                <div key={a}>
                  <input
                    aria-describedby={
                      errors.activity ? "activity-error" : undefined
                    }
                    aria-invalid={!!errors.activity}
                    type="checkbox"
                    id={`activity-${a}`}
                    value={a}
                    {...register("activity")}
                    defaultChecked={submittedActivity.includes(a)}
                  />
                  <label htmlFor={`activity-${a}`}>{a}</label>
                </div>
              ))}
              <div id="activity-error" className="error-message">
                {errors.activity && errors.activity.message}
              </div>
            </>
          )}

          <div className="trail__pair__field-wrapper__form__checkbox__buttons">
            <SubmitButton isSubmitting={isPending} buttonName="Change" />
            <button type="button" onClick={() => setIsVisible(!isVisible)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrailLegacyDetailsActivityField;
