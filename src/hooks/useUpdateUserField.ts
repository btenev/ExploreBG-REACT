import { useMutation } from '@tanstack/react-query';
import { useSessionStore } from '../store/sessionStore';
import { UserPatchMap, usersApi } from '../api/usersApi';
import { ApiError, IUserSession } from '../types';
import { toast } from 'react-toastify';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
type SessionUpdatableField = Extract<keyof UserPatchMap, keyof IUserSession>;

const useUpdateUserField = <K extends keyof UserPatchMap>(field: K) => {
  const store = useSessionStore((state) => state.updateUserFields);

  return useMutation({
    mutationKey: [`updateUser${capitalize(field)}`],
    mutationFn: (data: UserPatchMap[K]) => usersApi.updateUserField(field, data),
    onSuccess: (data) => {
      if ((['username'] as SessionUpdatableField[]).includes(field as SessionUpdatableField)) {
        store(data as Partial<IUserSession>);
      }
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

export default useUpdateUserField;
