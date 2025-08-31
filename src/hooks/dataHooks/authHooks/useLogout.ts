import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { authApi } from "@api/auth";
import { handleApiError } from "@utils/errorHandlers";
import { clearSession } from "@utils/sessionUtils";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authApi.logout(),
    onSuccess: (data) => {
      clearSession();
      queryClient.removeQueries();
      toast.success(data.message || "You have successfully logged out!");
      navigate("/");
    },
    onError: handleApiError,
  });
};
