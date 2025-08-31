import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  UserFieldRequestMap,
  UserFieldResponseMap,
  usersApi,
} from "@api/public";
import { useSessionStore } from "@store/sessionStore";
import { IUserSession } from "@types";
import { handleApiError } from "@utils/errorHandlers";
import { capitalize } from "@utils/mixedUtils";

type ExtractInnerValue<K extends keyof UserFieldResponseMap> =
  UserFieldResponseMap[K][keyof UserFieldResponseMap[K]];

export const useUpdateUserField = <K extends keyof UserFieldRequestMap>(
  field: K,
  setStateValue?: Dispatch<SetStateAction<ExtractInnerValue<K>>>
) => {
  const store = useSessionStore((state) => state.updateUserFields);
  const clearSession = useSessionStore((state) => state.clearSession);
  const navigate = useNavigate();

  const sessionUpdatableFields: (keyof IUserSession)[] = [
    "username",
    "userImage",
  ];

  return useMutation({
    mutationKey: [`updateUser${capitalize(field)}`],
    mutationFn: (data: UserFieldRequestMap[K]) =>
      usersApi.updateUserField(field, data),
    onSuccess: (data) => {
      if (field === "password") {
        const { message } = data as UserFieldResponseMap["password"];
        toast.success(
          message || "Your password has been updated successfully."
        );
        clearSession();
        navigate("/authentication");
        return;
      }

      if (!data) {
        toast.error(`Failed to update ${field}. Something went wrong.`);
        return;
      }

      const value = Object.values(data)[0] as ExtractInnerValue<K>;

      if (sessionUpdatableFields.includes(field as keyof IUserSession)) {
        store({ [field]: value }); // Update session store with the new data
      } else if (setStateValue) {
        setStateValue(value);
      }

      toast.success(`You successfully updated your ${field}`);
    },
    onError: handleApiError,
  });
};
