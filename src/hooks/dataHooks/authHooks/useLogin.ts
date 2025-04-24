import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { authApi } from '../../../api/authClient';
import { useSessionStore } from '../../../store/sessionStore';
import { ApiError } from '../../../types';
import { LoginDto } from '../../../schemas';

export const useLogin = () => {
  const store = useSessionStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginDto) => authApi.login(data),
    onSuccess: (data) => {
      store({
        userId: data.id,
        username: data.username,
        userImage: data.imageUrl,
        userRoles: data.roles,
      });
      toast.success(`Welcome ${data.username}!`);
      navigate('/users/my-profile');
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
