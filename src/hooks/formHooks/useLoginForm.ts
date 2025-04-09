import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema } from '../../schemas';

const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    isSubmitting,
  };
};

export default useLoginForm;
