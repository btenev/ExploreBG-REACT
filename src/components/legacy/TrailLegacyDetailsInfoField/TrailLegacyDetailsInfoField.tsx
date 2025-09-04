import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';

import { TrailInfoDto, useTrailInfoForm } from '../../../hooks/formHooks/trailHooks';
import { useLegacyUpdateHikingTrailField } from '../../../hooks/legacy';
import { CommonModal, ExpandableText, SubmitButton } from '../../common';

const trailInfoVisibleTextLength = 155;

interface Props {
  initialInfo: string;
  trailId: number;
  canEdit: boolean;
}

const TrailLegacyDetailsInfoField = ({ initialInfo, trailId, canEdit }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [trailInfo, setTrailInfo] = useState<string>(initialInfo);
  const { register, handleSubmit, errors } = useTrailInfoForm();
  const { mutate: updateUserInfo, isPending } = useLegacyUpdateHikingTrailField(
    'trailInfo',
    trailId,
    setTrailInfo
  );

  const onSubmit = (data: TrailInfoDto) => {
    if (data.trailInfo === trailInfo) {
      setIsVisible(false);
      return;
    }

    updateUserInfo(data);
    setIsVisible(false);
  };

  return (
    <div
      className="trail__info"
      style={{ cursor: trailInfo.length > trailInfoVisibleTextLength ? 'pointer' : 'unset' }}
    >
      <ExpandableText text={trailInfo} length={trailInfoVisibleTextLength} />
      {canEdit && (
        <FaEdit
          className="trail-edit-icon"
          aria-label="Edit trail info"
          onClick={() => setIsVisible(!isVisible)}
        />
      )}

      {isVisible && (
        <CommonModal>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="textarea-form"
            style={{ display: isVisible ? 'flex' : 'none' }}
          >
            <textarea
              id="trailInfo"
              {...register('trailInfo')}
              defaultValue={trailInfo}
              aria-invalid={!!errors.trailInfo}
              aria-describedby="trailInfo-error"
              cols={30}
              rows={10}
            />

            <div>
              <SubmitButton isSubmitting={isPending} buttonName="Change" />
              <button type="button" onClick={() => setIsVisible(!isVisible)}>
                Cancel
              </button>
            </div>
          </form>

          {errors.trailInfo && <div className="error-message">{errors.trailInfo.message}</div>}
        </CommonModal>
      )}
    </div>
  );
};

export default TrailLegacyDetailsInfoField;
