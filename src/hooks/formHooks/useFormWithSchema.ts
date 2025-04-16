import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ZodTypeAny, infer as zodInfer } from 'zod';

const useFormWithSchema = <Schema extends ZodTypeAny>(schema: Schema) => {
  type SchemaType = zodInfer<Schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SchemaType>({
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
