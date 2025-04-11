import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { imagesApi } from '../api/imagesApi';
import { useSessionStore } from '../store/sessionStore';
import { ApiError } from '../types';

export const useUpdateUserPhoto = () => {
  const store = useSessionStore((state) => state.updateUserFields);

  return useMutation({
    mutationKey: ['userPhoto'],
    mutationFn: (data: FormData) => imagesApi.updateUserPhoto(data),
    onSuccess: (data) => {
      store({
        userImage: data.imageUrl,
      });
      toast.success('You successfully updated you profile photo!');
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
