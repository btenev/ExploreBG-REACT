import { useForm } from 'react-hook-form';

const useFormBasic = <T extends Record<string, any>>() => {
  const { register, handleSubmit } = useForm<T>();
  return { register, handleSubmit };
};

export default useFormBasic;
