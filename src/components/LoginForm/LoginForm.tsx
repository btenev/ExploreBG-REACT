import { SubmitButton } from '../common';
import { useLoginForm } from '../../hooks/formHooks';
import { useLogin } from '../../hooks/useLogin';
import { LoginDto } from '../../schemas';

const LoginForm = () => {
  const { handleSubmit, register, errors, isSubmitting, isValid } = useLoginForm();
  const { mutate: login } = useLogin();

  const onSubmit = (data: LoginDto) => {
    login(data);
  };

  return (
    <section className="login-register-form">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="fields">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="John Doe"
            autoComplete="current-email"
          />
          {errors.email && <div className="error-message">{errors.email.message}</div>}
        </div>

        <div className="fields">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            placeholder="*********"
            autoComplete="current-password"
          />
          {errors.password && <div className="error-message">{errors.password.message}</div>}
        </div>

        <SubmitButton isSubmitting={isSubmitting} isValid={isValid} buttonName="Login" />
      </form>
    </section>
  );
};

export default LoginForm;
