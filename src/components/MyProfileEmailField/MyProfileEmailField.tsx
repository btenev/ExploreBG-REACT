import { useRef, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

import { SubmitButton } from '../common';
import useCloseOnEscapeTabAndClickOutside from '../../hooks/uiHooks/useCloseOnEscapeTabClick';
import { useEmailForm } from '../../hooks/formHooks';
import useUpdateUserField from '../../hooks/useUpdateUserField';

interface Props {
  initialEmail: string;
}

const MyProfileEmailField = ({ initialEmail }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(initialEmail);
  const { handleSubmit, register, errors, isSubmitting, isValid } = useEmailForm();
  const { mutate: updateEmail } = useUpdateUserField('email', setEmail);

  const onSubmit = (data: { email: string }) => {
    if (data.email === email) {
      setIsVisible(false);
      return;
    }

    updateEmail(data);
    setIsVisible(false);
  };

  const formRef = useRef<HTMLFormElement>(null);

  useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));
  return (
    <div>
      <p style={{ opacity: isVisible ? '0' : '1' }}>
        <HiOutlineMail /> <strong>{email}</strong>
        <FaEdit
          className="edit"
          onClick={() => setIsVisible(!isVisible)}
          style={{ cursor: isVisible ? 'none' : 'pointer' }}
        />
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        ref={formRef}
        style={{ display: isVisible ? 'flex' : 'none' }}
      >
        <input
          id="email"
          type="email"
          {...register('email')}
          defaultValue={email}
          className="email-field"
        />

        <SubmitButton isSubmitting={isSubmitting} isValid={isValid} buttonName="Change" />
        <button type="button" onClick={() => setIsVisible(!isVisible)}>
          Cancel
        </button>

        {errors.email && <div className="error-message">{errors.email.message}</div>}
      </form>
    </div>
  );
};

export default MyProfileEmailField;
