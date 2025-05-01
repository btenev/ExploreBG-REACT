import { useForm } from 'react-hook-form';

const useFormBasic = <T extends Record<string, any>>() => {
  const { register, handleSubmit, control } = useForm<T>();
  return { register, handleSubmit, control };
};

export default useFormBasic;
