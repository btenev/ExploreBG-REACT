import { useRef, useState } from 'react';
import { FaEdit } from 'react-icons/fa';

import { SubmitButton } from '../common';
import useCloseOnEscapeTabAndClickOutside from '../../hooks/uiHooks/useCloseOnEscapeTabClick';
import { EndPointDto, useEndPointForm } from '../../hooks/formHooks/trailHooks';
import { useUpdateHikingTrailField } from '../../hooks/dataHooks/trailHooks';

interface Props {
  initialEndPoint: string;
  trailId: number;
  isTrailOwner: boolean;
}

const TrailDetailsEndPointField = ({ initialEndPoint, trailId, isTrailOwner }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [endPoint, setEndPoint] = useState<string>(initialEndPoint);
  const { register, handleSubmit, errors } = useEndPointForm();
  const { mutate: updateEndPoint, isPending } = useUpdateHikingTrailField(
    'endPoint',
    trailId,
    setEndPoint
  );

  const onSubmit = (data: EndPointDto) => {
    if (data.endPoint === endPoint) {
      setIsVisible(false);
      return;
    }

    updateEndPoint(data);
  };

  const formRef = useRef<HTMLFormElement>(null);

  useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));

  return (
    <div className="trail__pair__field-wrapper">
      <div className="trail__pair__field-wrapper__field" style={{ opacity: isVisible ? '0' : '1' }}>
        <details open>
          <summary>
            to: <strong>{endPoint}</strong>
          </summary>
          {/* <GrMapLocation />&nbsp; 018293794663487685 */}
        </details>
        {isTrailOwner && (
          <FaEdit
            onClick={() => setIsVisible(!isVisible)}
            className="trail-edit-icon"
            style={{ cursor: isVisible ? 'none' : 'pointer' }}
          />
        )}
      </div>

      <div className="trail__pair__field-wrapper__form">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          ref={formRef}
          style={{ display: isVisible ? 'flex' : 'none' }}
        >
          <input id="endPoint" type="text" {...register('endPoint')} defaultValue={endPoint} />

          <SubmitButton isSubmitting={isPending} buttonName="Change" />
          <button type="button" onClick={() => setIsVisible(!isVisible)}>
            Cancel
          </button>
        </form>

        <div style={{ display: isVisible ? 'block' : 'none' }} className="error-message">
          {errors.endPoint && errors.endPoint.message}
        </div>
      </div>
    </div>
  );
};

export default TrailDetailsEndPointField;
