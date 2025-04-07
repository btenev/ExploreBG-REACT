import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { authApi } from '../api/authApi';
import { useSessionStore } from '../store/sessionStore';

export const useLogin = () => {
  const store = useSessionStore((state) => state.setUser);

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (data: { email: string; password: string }) =>
      authApi.login(data),
    onSuccess: (data) => {
      store(data);

      toast.success('Login successful!');
    },
    onError: (error) => {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.');
    },
  });
};
