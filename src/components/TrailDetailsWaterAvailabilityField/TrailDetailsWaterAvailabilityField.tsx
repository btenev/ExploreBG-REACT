import { useRef, useState } from 'react';

import { FaEdit, FaHandHoldingWater } from 'react-icons/fa';

import { WaterAvailabilityEnum } from '../../types';

import useCloseOnEscapeTabAndClickOutside from '../../hooks/uiHooks/useCloseOnEscapeTabClick';
import { useWaterAvailabilityForm, WaterAvailabilityDto } from '../../hooks/formHooks/trailHooks';
import { useUpdateHikingTrailField } from '../../hooks/dataHooks/trailHooks';

import { SubmitButton } from '../common';

interface Props {
  initialWaterAvailability: WaterAvailabilityEnum;
  trailId: number;
  canEdit: boolean;
  formEnums: WaterAvailabilityEnum[];
  isLoadingEnums: boolean;
}

const TrailDetailsWaterAvailabilityField = ({
  initialWaterAvailability,
  trailId,
  canEdit,
  formEnums,
  isLoadingEnums,
}: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [waterAvailability, setWaterAvailability] =
    useState<WaterAvailabilityEnum>(initialWaterAvailability);
  const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit } = useWaterAvailabilityForm();
  const { mutate: updateWaterAvailability, isPending } = useUpdateHikingTrailField(
    'waterAvailability',
    trailId,
    setWaterAvailability
  );

  const onSubmit = (data: WaterAvailabilityDto) => {
    if (data.waterAvailability === waterAvailability) {
      setIsVisible(false);
      return;
    }

    updateWaterAvailability(data);
    setIsVisible(false);
  };

  useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));
  return (
    <div className="trail__pair__field-wrapper">
      <div style={{ opacity: isVisible ? '0' : '1' }} className="trail__pair__field-wrapper__field">
        <p>
          <FaHandHoldingWater />
          &nbsp;&nbsp; water sources: &nbsp;{waterAvailability}
        </p>
        {canEdit && (
          <FaEdit
            className="trail-edit-icon"
            style={{ cursor: isVisible ? 'none' : 'pointer' }}
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
          style={{ display: isVisible ? 'flex' : 'none' }}
        >
          {isLoadingEnums ? (
            <p>Loading water availability options..</p>
          ) : (
            <>
              <select
                id="waterAvailability"
                {...register('waterAvailability')}
                defaultValue={waterAvailability}
                aria-label="Select water availability"
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

export default TrailDetailsWaterAvailabilityField;
