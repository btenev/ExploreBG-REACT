import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useQueryClient } from '@tanstack/react-query';

import { authApi } from '../../../api/authClient';
import { clearSession } from '../../../utils/sessionUtils';
import { handleApiError } from '../../../utils/errorHandlers';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authApi.logout(),
    onSuccess: (data) => {
      clearSession();
      queryClient.removeQueries();
      toast.success(data.message || 'You have successfully logged out!');
      navigate('/');
    },
    onError: handleApiError,
  });
};
