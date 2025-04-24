import { useRef, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';

import { SubmitButton } from '../common';
import { formatDate } from '../../utils/dateUtils';
import useCloseOnEscapeTabAndClickOutside from '../../hooks/uiHooks/useCloseOnEscapeTabClick';
import { useUserBirthdateForm } from '../../hooks/formHooks/userHooks';
import { UserBithdateDto } from '../../schemas';
import { useUpdateUserField } from '../../hooks/dataHooks/userHooks';

interface Props {
  birthdate: string | null;
}

const MyProfileBirthdateField = ({ birthdate }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [birthdateValue, setBirthdateValue] = useState<string | null>(birthdate);
  const { handleSubmit, register, errors, isSubmitting, isValid } = useUserBirthdateForm();
  const { mutate: updateUserBirthdate } = useUpdateUserField('birthdate', setBirthdateValue);

  const onSubmit = (data: UserBithdateDto) => {
    if (data.birthdate === birthdateValue) {
      setIsVisible(false);
      return;
    }

    if (data.birthdate === null) {
      updateUserBirthdate({ birthdate: null });
      setIsVisible(false);
      return;
    }

    updateUserBirthdate({ birthdate: data.birthdate });
    setIsVisible(false);
  };

  const formRef = useRef<HTMLFormElement>(null);

  useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));

  return (
    <div>
      <p style={{ opacity: isVisible ? '0' : '1' }}>
        <LiaBirthdayCakeSolid /> Birthdate:&nbsp;&nbsp;
        <strong>{birthdateValue ? formatDate(birthdateValue) : '.....'}</strong>
        <FaEdit className="edit" onClick={() => setIsVisible(!isVisible)} />
      </p>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
        style={{ display: isVisible ? 'flex' : 'none' }}
      >
        <input
          id="birthdate"
          type="date"
          {...register('birthdate')}
          defaultValue={birthdateValue ?? ''}
          className="birthdate-field"
        />

        <SubmitButton isSubmitting={isSubmitting} isValid={isValid} buttonName="Change" />
        <button type="button" onClick={() => setIsVisible(!isVisible)}>
          Cancel
        </button>

        {errors.birthdate && <div className="error-message">{errors.birthdate.message}</div>}
      </form>
    </div>
  );
};

export default MyProfileBirthdateField;
