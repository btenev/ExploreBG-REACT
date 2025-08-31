import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, useForm } from "react-hook-form";
import { ZodTypeAny, infer as zodInfer } from "zod";

export const useFormWithSchema = <Schema extends ZodTypeAny>(
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
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
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
    isDirty,
  };
};
