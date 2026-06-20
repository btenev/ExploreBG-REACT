import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { authApi } from "@api/auth";
import { PUBLIC_ROUTES } from "@constants";
import { RegisterDto } from "@schemas/user";
import { useSessionStore } from "@store/sessionStore";
import { handleApiError } from "@utils/errorHandlers";

export const useRegister = (redirectTo?: string) => {
  const store = useSessionStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["register"],
    mutationFn: (data: RegisterDto) => authApi.register(data),
    onSuccess: (data) => {
      store({
        userId: data.id,
        username: data.username,
        userRoles: data.roles,
      });
      toast.success(`Welcome ${data.username}!`);
      navigate(redirectTo ?? PUBLIC_ROUTES.user.myProfile, { replace: true });
    },
    onError: handleApiError,
  });
};
