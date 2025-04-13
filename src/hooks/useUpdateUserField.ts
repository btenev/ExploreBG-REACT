import { Dispatch, SetStateAction } from 'react';
import { useMutation } from '@tanstack/react-query';

import { useSessionStore } from '../store/sessionStore';
import { UserPatchMap, usersApi } from '../api/usersApi';
import { ApiError, IUserSession } from '../types';
import { toast } from 'react-toastify';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const useUpdateUserField = <K extends keyof UserPatchMap>(
  field: K,
  setStateValue?: Dispatch<SetStateAction<string | null>>
) => {
  const store = useSessionStore((state) => state.updateUserFields);

  const sessionUpdatableFields: (keyof IUserSession)[] = ['username', 'userImage'];

  return useMutation({
    mutationKey: [`updateUser${capitalize(field)}`],
    mutationFn: (data: UserPatchMap[K]) => usersApi.updateUserField(field, data),
    onSuccess: (data) => {
      if (!data) {
        toast.error(`Failed to update ${field}. Something went wrong.`);
        return;
      }

      const value = Object.values(data)[0] as string;

      if (sessionUpdatableFields.includes(field as keyof IUserSession)) {
        store({ [field]: value }); // Update session store with the new data
      } else if (setStateValue) {
        setStateValue(value);
      }

      toast.success(`You successfully updated your ${field}`);
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
