import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { RegisterDto } from '../schemas';
import { useSessionStore } from '../store/sessionStore';
import { authApi } from '../api/authClient';
import { ApiError } from '../types';

export const useRegister = () => {
  const store = useSessionStore((state) => state.setUser);

  return useMutation({
    mutationKey: ['register'],
    mutationFn: (data: RegisterDto) => authApi.register(data),
    onSuccess: (data) => {
      store({
        userId: data.id,
        username: data.username,
        userRoles: data.roles,
      });
      toast.success(`Welcome ${data.username}!`);
    },
    onError: (error: ApiError) => {
      if (error.errors) {
        error.errors.forEach((err: string) => toast.error(err));
      } else {
        toast.error(error.message);
      }
    },
  });
};
