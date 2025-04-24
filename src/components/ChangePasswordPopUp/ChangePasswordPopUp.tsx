import './ChangePasswordPopUp.scss';

import { usePasswordForm } from '../../hooks/formHooks/userHooks';
import { PasswordDto } from '../../schemas';
import PasswordInfo from '../PasswordInfo';
import { useUpdateUserField } from '../../hooks/dataHooks/userHooks';

interface Props {
  closePopUp: () => void;
}

const ChangePasswordPopUp = ({ closePopUp }: Props) => {
  const { register, handleSubmit, errors } = usePasswordForm();
  const { mutate: updatePassword } = useUpdateUserField('password');

  const onSubmit = (data: PasswordDto) => {
    console.log('Form data:', data);
    updatePassword(data);
    closePopUp();
  };

  return (
    <section className="pop-up-wrapper">
      <article className="pop-up-wrapper__modal">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="change-pass-form">
          <div>
            <label htmlFor="currentPassword">Current password</label>
            <input
              id="currentPassword"
              type="password"
              {...register('currentPassword')}
              placeholder="***************"
              autoComplete="current-password"
            />
            {errors.currentPassword && (
              <div className="error-message">{errors.currentPassword.message}</div>
            )}
          </div>

          <div>
            <label htmlFor="newPassword">
              New password &nbsp;
              <PasswordInfo />
            </label>
            <input
              id="newPassword"
              type="password"
              {...register('newPassword')}
              placeholder="***************"
              autoComplete="new-password"
            />
            {errors.newPassword && (
              <div className="error-message">{errors.newPassword.message}</div>
            )}
          </div>

          <div>
            <label htmlFor="confirmNewPassword">Confirm new password</label>
            <input
              id="confirmNewPassword"
              type="password"
              {...register('confirmNewPassword')}
              placeholder="***************"
              autoComplete="new-password"
            />
            {errors.confirmNewPassword && (
              <div className="error-message">{errors.confirmNewPassword.message}</div>
            )}
          </div>

          <button type="submit">Change</button>
        </form>

        <button onClick={closePopUp}>Cancel</button>
      </article>
    </section>
  );
};

export default ChangePasswordPopUp;
