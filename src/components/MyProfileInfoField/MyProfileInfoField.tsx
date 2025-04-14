import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';

import { CommonModal, SubmitButton } from '../common';
import { useUserInfoForm } from '../../hooks/formHooks';
import useUpdateUserField from '../../hooks/useUpdateUserField';

interface Props {
  userInfo: string | null;
}

const MyProfileInfoField = ({ userInfo }: Props) => {
  const [infoValue, setInfoValue] = useState<string | null>(userInfo);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { handleSubmit, register, errors, isSubmitting, isValid } = useUserInfoForm();
  const { mutate: updateUserInfo } = useUpdateUserField('userInfo', setInfoValue);

  const onSubmit = (data: { userInfo?: string }) => {
    if (data.userInfo === infoValue) {
      setIsVisible(false);
      return;
    }

    if (data.userInfo === '' || data.userInfo === undefined) {
      setInfoValue(null);
      updateUserInfo({ userInfo: null });
      setIsVisible(false);
      return;
    }

    updateUserInfo({ userInfo: data.userInfo });
    setIsVisible(false);
  };

  return (
    <div>
      <p className="info-text">
        {infoValue ?? (
          <>
            <span>My info: </span>
            <strong>.........</strong>
          </>
        )}
        <FaEdit className="edit" onClick={() => setIsVisible(!isVisible)} />
      </p>

      {isVisible && (
        <CommonModal>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="textarea-form">
            <textarea
              id="userInfo"
              {...register('userInfo')}
              defaultValue={infoValue ?? ''}
              // cols={30} rows={10}
              placeholder=" ........"
            ></textarea>

            <div>
              <SubmitButton isSubmitting={isSubmitting} isValid={isValid} buttonName="Change" />
              <button type="button" onClick={() => setIsVisible(!isVisible)}>
                Cancel
              </button>
            </div>
          </form>

          {errors.userInfo && <div className="error-message">{errors.userInfo.message}</div>}
        </CommonModal>
      )}
    </div>
  );
};

export default MyProfileInfoField;
