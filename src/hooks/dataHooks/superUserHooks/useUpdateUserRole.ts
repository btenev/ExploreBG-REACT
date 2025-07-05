import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-toastify';

import { superUsersApi } from '../../../api/superUsersApi';
import { IUser } from '../../../types/shared/user';

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateUserRole'],
    mutationFn: ({ userId, moderator }: { userId: string; moderator: boolean }) =>
      superUsersApi.updateUserRole(userId, moderator),
    onSuccess: ({ moderator }, variables) => {
      queryClient.setQueryData<IUser[]>(['allUsers'], (oldUsers) => {
        if (!oldUsers) return [];

        return oldUsers.map((user) =>
          user.id === Number(variables.userId) ? { ...user, moderator: moderator } : user
        );
      });

      toast.success(
        `Successfully changed the user's role to ${variables.moderator ? 'Moderator' : 'Member'}.`
      );
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
  });
};
