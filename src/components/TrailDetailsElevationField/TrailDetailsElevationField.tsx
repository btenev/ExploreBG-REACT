import { useRef, useState } from 'react';
import { GiMountainRoad } from 'react-icons/gi';
import { FaEdit } from 'react-icons/fa';

import useCloseOnEscapeTabAndClickOutside from '../../hooks/uiHooks/useCloseOnEscapeTabClick';
import { SubmitButton } from '../common';
import { ElevationGainedDto, useElevationGainedForm } from '../../hooks/formHooks/trailHooks';
import { useUpdateHikingTrailField } from '../../hooks/dataHooks/trailHooks';

interface Props {
  initialElevation: number | null;
  trailId: number;
  canEdit: boolean;
}

const TrailDetailsElevationField = ({ initialElevation, trailId, canEdit }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [elevationGained, setElevationGained] = useState<number | null>(initialElevation);
  const { register, handleSubmit, errors } = useElevationGainedForm();
  const { mutate: updateElevationGained, isPending } = useUpdateHikingTrailField(
    'elevationGained',
    trailId,
    setElevationGained
  );

  const onSubmit = (data: ElevationGainedDto) => {
    if (data.elevationGained === elevationGained) {
      setIsVisible(false);
      return;
    }

    updateElevationGained(data);
    setIsVisible(false);
  };

  const formRef = useRef<HTMLFormElement>(null);

  useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));

  return (
    <div className="trail__pair__field-wrapper">
      <div className="trail__pair__field-wrapper__field">
        <p>
          <GiMountainRoad />
          &nbsp; elevation: &nbsp;
          {elevationGained ? `${elevationGained} m` : 'not available'}
        </p>
        {canEdit && <FaEdit className="trail-edit-icon" onClick={() => setIsVisible(!isVisible)} />}
      </div>

      <div className="trail__pair__field-wrapper__form">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          ref={formRef}
          style={{ display: isVisible ? 'flex' : 'none' }}
        >
          <input
            id="elevationGained"
            type="text"
            {...register('elevationGained')}
            defaultValue={elevationGained ?? ''}
          />

          <SubmitButton isSubmitting={isPending} buttonName="Change" />
          <button type="button" onClick={() => setIsVisible(!isVisible)}>
            Cancel
          </button>
        </form>

        <div style={{ display: isVisible ? 'block' : 'none' }} className="error-message">
          {errors.elevationGained && errors.elevationGained.message}
        </div>
      </div>
    </div>
  );
};

export default TrailDetailsElevationField;
