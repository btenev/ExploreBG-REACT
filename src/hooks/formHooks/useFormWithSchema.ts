import { DefaultValues, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ZodTypeAny, infer as zodInfer } from 'zod';

const useFormWithSchema = <Schema extends ZodTypeAny>(
  schema: Schema,
  defaultValues?: DefaultValues<zodInfer<Schema>>
) => {
  type SchemaType = zodInfer<Schema>;

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues,
  });

  return {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    reset,
    errors,
    isValid,
    isSubmitting,
  };
};

export default useFormWithSchema;
