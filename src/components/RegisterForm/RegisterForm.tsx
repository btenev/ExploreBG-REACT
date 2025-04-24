import PasswordInfo from '../PasswordInfo';
import { SubmitButton } from '../common';
import { RegisterDto } from '../../schemas';
import { useRegisterForm } from '../../hooks/formHooks/authHooks';
import { useRegister } from '../../hooks/dataHooks/authHooks';

const RegisterForm = () => {
  const { register, handleSubmit, errors, isSubmitting, isValid } = useRegisterForm();
  const { mutate: login } = useRegister();

  const onSubmit = (data: RegisterDto) => {
    login(data);
  };

  return (
    <section className="login-register-form">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="john.doe@gmail.com"
            autoComplete="current-email"
          />
          {errors.email && <div className="error-message">{errors.email.message}</div>}
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            {...register('username')}
            placeholder="John Doe"
            autoComplete="current-username"
          />
          {errors.username && <div className="error-message">{errors.username.message}</div>}
        </div>

        <div>
          <label htmlFor="password">
            Password &nbsp;
            <PasswordInfo />
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            placeholder="*********"
            autoComplete="current-password"
          />
          {errors.password && <div className="error-message">{errors.password.message}</div>}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            placeholder="*********"
            autoComplete="current-confirmPassword"
          />
          {errors.confirmPassword && (
            <div className="error-message">{errors.confirmPassword.message}</div>
          )}
        </div>
        <SubmitButton isSubmitting={isSubmitting} isValid={isValid} buttonName="Register" />
      </form>
    </section>
  );
};

export default RegisterForm;
