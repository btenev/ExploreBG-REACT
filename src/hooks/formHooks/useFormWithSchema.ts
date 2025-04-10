import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';

const useFormWithSchema = <T extends Record<string, any>>(schema: ZodSchema<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<T>({
    resolver: zodResolver(schema),
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

export default useFormWithSchema;
