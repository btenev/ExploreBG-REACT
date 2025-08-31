import { useForm } from "react-hook-form";

export const useFormBasic = <T extends Record<string, any>>() => {
  const { register, handleSubmit, control } = useForm<T>();
  return { register, handleSubmit, control };
};
